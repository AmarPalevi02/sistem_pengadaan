import prisma from '../../prisma/prismaClient'
import { BadRequestError, NotFound, Unauthorized } from '../errors';
import { CreateRequestInput } from '../types/request.employe'
import { v4 as uuidv4 } from 'uuid';

export const createRequest = async (data: CreateRequestInput, employeeId: string) => {
   const requestNumber = `REQ-${uuidv4()}`

   const newRequest = await prisma.request.create({
      data: {
         requestNumber,
         title: data.title,
         description: data.description,
         priority: data.priority,
         status: "PENDING",
         employeeId: employeeId,
         items: {
            create: data.items.map((item) => ({
               itemName: item.itemName,
               quantity: item.quantity,
               unit: item.unit,
               specification: item.specification,
            }))
         }
      },
      include: {
         items: true,
      },
   })

   return newRequest
}

export const getAllRequest = async () => {
   const getAllRequest = await prisma.request.findMany()

   return getAllRequest
}

export const cenceldRequest = async (requestId: string, employeeId: string) => {
   const checkedRequestId = await prisma.request.findUnique({
      where: { id: requestId }
   })

   if (!checkedRequestId) throw new NotFound("Request not fount!")

   if (checkedRequestId.status !== "PENDING") throw new BadRequestError("Request cannot be canceled at this stage")

   if (checkedRequestId.employeeId !== employeeId) throw new Unauthorized("You are not authorized to cancel this request")


   const result = await prisma.request.update({
      where: { id: requestId },
      data: {
         status: "CANCELED"
      }
   })

   return result
}