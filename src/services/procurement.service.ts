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

export const createProcrutment = async (data: CreateProcurementPayload, procurementOfficerId: string) => {
   const request = await prisma.request.findUnique({
      where: { id: data.requestId },
   });

   if (!request) throw new NotFound("Request not found");
   if (request.status !== 'APPROVED') throw new Forbidden("Request is not approved yet");

   const vendor = await prisma.vendor.findUnique({
      where: { id: data.vendorId }
   });

   if (!vendor) throw new NotFound("Vendor not found");

   const { procurementItems, requestId, ...procurementData } = data;

   const itemsWithTotal = procurementItems.map((item) => ({
      ...item,
      totalPrice: item.pricePerUnit * item.quantity,
   }));

   const procurement = await prisma.procurement.create({
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

   await prisma.trackingHistory.create({
      data: {
         procurementId: procurement.id,
         status: "ORDERED",
         updatedById: procurementOfficerId,
         notes: "Procurement created and ordered",
      },
   });

   return procurement;
}