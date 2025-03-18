import prisma from '../../prisma/prismaClient'
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