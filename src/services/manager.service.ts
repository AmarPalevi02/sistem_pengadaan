import prisma from '../../prisma/prismaClient'
import { Forbidden, NotFound } from '../errors'

export const getPendingRequest = async () => {
   return await prisma.request.findMany({
      where: { status: 'PENDING' },
      include: { employee: true }
   })
}

export const getRequestDetail = async (requestNumber: string) => {
   const request = await prisma.request.findUnique({
      where: { requestNumber: requestNumber },
      include: { employee: true }
   })

   if (!request) throw new NotFound('Request not found')

   return request
}

export const approveRequest = async (requestNumber: string, managerId: string, approvalByManager: string, notes: string) => {
   const request = await prisma.request.findUnique({
      where: { requestNumber: requestNumber },
   })

   if (!request) throw new NotFound("Request not found")
   if (request.status !== "PENDING") throw new Forbidden("Request already processed")

   await prisma.request.update({
      where: { requestNumber },
      data: {
         status: 'APPROVED',
      },
   });

   await prisma.approval.create({
      data: {
         requestId: request.id,
         managerId: managerId,
         status: 'APPROVED',
         notes: notes,
         approvedAt: new Date(),
      },
   });

   await prisma.request.update({
      where: { requestNumber },
      data: {
         approvedBy: approvalByManager,
         approvedAt: new Date()
      }
   })

   return { message: "Request approved successfully" };
}

export const rejectRequest = async (requestNumber: string, managerId: string, rejectByManager: string, notes: string) => {
   const request = await prisma.request.findUnique({
      where: { requestNumber: requestNumber }
   })

   if (!request) throw new NotFound("Request not found")
   if (request.status !== "PENDING") throw new Forbidden("Request already processed")

   await prisma.request.update({
      where: { requestNumber },
      data: {
         status: 'REJECTED',
      },
   });

   await prisma.approval.create({
      data: {
         requestId: request.id,
         managerId: managerId,
         status: 'REJECTED',
         notes: notes,
         approvedAt: new Date(),
      },
   });

   await prisma.request.update({
      where: { requestNumber },
      data: {
         approvedBy: rejectByManager,
         approvedAt: new Date()
      }
   })

   return { message: "Request rejected successfully" };
}

export const getManagerApprovalHistory = async (managerId: string) => {
   const result = await prisma.approval.findMany({
      where: {
         managerId: managerId,
         status: { in: ['APPROVED', 'REJECTED'] }
      },
      include: { request: true },
      orderBy: { approvedAt: 'desc' }
   })

   return result
}