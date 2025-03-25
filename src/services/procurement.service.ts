import { ProcurementStatus } from "@prisma/client"
import prisma from "../../prisma/prismaClient"
import { Forbidden, NotFound } from "../errors"
import { CreateProcurementPayload } from "../types/procurement"

export const getAllProcurements = async (status?: ProcurementStatus) => {
   const whereClose = status ? { status } : {}

   const procrutments = await prisma.procurement.findMany({
      where: whereClose,
      include: {
         procurementItems: true,
         Vendor: true,
         TrackingHistory: true,
         ReceivingDocument: true,
         request: {
            include: { employee: true }
         }
      }
   })

   return procrutments
}

export const getProcurementById = async (id: string) => {
   const procrutment = await prisma.procurement.findUnique({
      where: { id },
      include: {
         procurementItems: true,
         Vendor: true,
         TrackingHistory: true,
         ReceivingDocument: true,
         request: {
            select: {
               id: true,
               requestNumber: true,
               title: true,
               description: true,
               createdAt: true,
               updatedAt: true,
               employee: {
                  select: { id: true, name: true }
               }
            },
         }
      }
   })

   if (!procrutment) throw new NotFound("Procrutmen not found")

   return procrutment
}

export const createProcrutment = async (
   data: CreateProcurementPayload,
   procurementOfficerId: string
) => {
   return await prisma.$transaction(async (tx) => {
      const request = await tx.request.findUnique({
         where: { id: data.requestId },
      });

      if (!request) throw new NotFound("Request not found");
      if (request.status !== "APPROVED") throw new Forbidden("Request is not approved yet");

      const vendor = await tx.vendor.findUnique({
         where: { id: data.vendorId },
      });

      if (!vendor) throw new NotFound("Vendor not found");

      const { procurementItems, requestId, ...procurementData } = data;

      const itemsWithTotal = procurementItems.map((item) => ({
         ...item,
         totalPrice: item.pricePerUnit * item.quantity,
      }));

      const procurement = await tx.procurement.create({
         data: {
            purchaseOrderNumber: procurementData.purchaseOrderNumber,
            deliveryDate: procurementData.deliveryDate,
            notes: procurementData.notes,

            status: "ORDERED",

            request: { connect: { id: requestId } },
            procurementOfficer: { connect: { id: procurementOfficerId } },

            vendorName: vendor.name,
            Vendor: { connect: { id: vendor.id } },

            procurementItems: {
               create: itemsWithTotal,
            },
         },
         include: {
            procurementItems: true,
         },
      });

      await tx.request.update({
         where: { id: requestId },
         data: { status: "PROCESSING" },
      });

      await tx.trackingHistory.create({
         data: {
            procurementId: procurement.id,
            status: "ORDERED",
            updatedById: procurementOfficerId,
            notes: "Procurement created and ordered",
         },
      });

      return procurement;
   });
};

export const updateProcurmentStatus = async (
   id: string,
   updatedById: string,
   status: ProcurementStatus,
   notes?: string
) => {
   return await prisma.$transaction(async (tx) => {
      const procurement = await tx.procurement.update({
         where: { id },
         data: { status },
      });

      await tx.trackingHistory.create({
         data: {
            procurementId: id,
            status,
            updatedById,
            notes,
         },
      });

      if (status === "DELIVERED") {
         await tx.request.update({
            where: { id: procurement.requestId },
            data: { status: "DELIVERED" },
         });
      }

      return procurement;
   });
};


export const confirmReceipt = async (
   id: string,
   receivedByEmployeeId: string,
   receiptNotes?: string,
   fileUrl?: string,
) => {
   const result = await prisma.$transaction(async (tx) => {
      const procurement = await tx.procurement.update({
         where: { id },
         data: {
            receivedByEmployee: true,
            receivedAt: new Date(),
            status: "COMPLETED",
            receiptNotes: receiptNotes || ""
         },
         select: { id: true, requestId: true }
      });

      const tracking = await tx.trackingHistory.create({
         data: {
            procurementId: procurement.id,
            status: "COMPLETED",
            updatedById: receivedByEmployeeId,
            notes: receiptNotes ?? 'Goods received'
         }
      });
      if (tracking.status === "COMPLETED" && procurement.requestId) {
         await tx.request.update({
            where: { id: procurement.requestId },
            data: { status: "COMPLETED" }
         });
      }
      if (fileUrl) {
         await tx.receivingDocument.create({
            data: {
               procurementId: procurement.id,
               fileUrl
            }
         });
      }

      return procurement;
   });

   return result
};