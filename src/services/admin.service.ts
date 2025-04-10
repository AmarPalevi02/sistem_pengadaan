import prisma from "../../prisma/prismaClient";
import { NotFound } from "../errors"
import { CreateVendor, UpdateUser, UpdateVendor } from "../types/createUser";
import { hashedPassword } from "../utils/bcrypt";

export const updateUser = async (userId: string, data: UpdateUser) => {
   const checkUserById = await prisma.user.findUnique({
      where: { id: userId }
   })

   if (!checkUserById) throw new NotFound("User is not found")

   const hashPassword = data.password
      ? await hashedPassword(data.password)
      : undefined;


   const result = await prisma.user.update({
      where: { id: userId },
      data: {
         name: data.name,
         email: data.email,
         password: hashPassword,
         role: data.role
      }
   })
   return result
}

export const deleteUser = async (userId: string) => {
   const checkedIdUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true }
   })

   if (!checkedIdUser) throw new NotFound("User not found")

   await prisma.user.delete({
      where: { id: userId }
   })

   return {
      deletedUser: checkedIdUser,
      message: `User ${checkedIdUser.name} has been deleted successfully`
   }
}

export const createVendor = async (data: CreateVendor) => {
   const createVendor = await prisma.vendor.create({
      data: {
         name: data.name,
         email: data.email,
         phone: data.phone,
         address: data.address
      }
   })

   return createVendor
}

export const getAllVendor = async () => {
   const getAllVendor = await prisma.vendor.findMany()

   return getAllVendor
}

export const updateVendor = async (vendorId: string, data: UpdateVendor) => {
   const checkVendor = await prisma.vendor.findUnique({
      where: { id: vendorId }
   })

   if (!checkVendor) throw new NotFound("Vendor is not vond")

   const result = await prisma.vendor.update({
      where: { id: vendorId },
      data: {
         name: data.name,
         email: data.email,
         phone: data.phone,
         address: data.address
      }
   })

   return result
}

export const destroyVendor = async (vendorId: string) => {
   const checkedVendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { id: true, name: true }
   })

   if (!checkedVendor) throw new NotFound("Vendor not found")

   await prisma.vendor.delete({
      where: { id: vendorId }
   })

   return {
      message: `succes deleted vendor ${checkedVendor.name}`
   }
}