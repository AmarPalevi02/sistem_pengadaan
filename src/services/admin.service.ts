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

export const getAllUserEmployee = async () => {
   const getAllEmployee = await prisma.user.count({
      where: { role: 'EMPLOYEE' }
   })

   return { count: getAllEmployee }
}

export const getAllUserProcurment = async () => {
   const getAllProcurment = await prisma.user.count({
      where: { role: 'PROCUREMENT' }
   })

   return { count: getAllProcurment }
}

export const getAllUserManager = async () => {
   const getAllManager = await prisma.user.count({
      where: { role: 'MANAGER' }
   })

   return { count: getAllManager }
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

export const getCountVendor = async () => {
   const countVendor = await prisma.vendor.count()

   return { count: countVendor }
}

export const getAllVendor = async () => {
   const getAllVendor = await prisma.vendor.findMany()

   return getAllVendor
}

export const getDatasManagers = async () => {
   const managers = await prisma.user.findMany({
      where: { role: "MANAGER" },
      select: { id: true, name: true, email: true }
   })

   return managers
}

export const getDatasEmpoyees = async () => {
   const employees = await prisma.user.findMany({
      where: { role: "EMPLOYEE" },
      select: { id: true, name: true, email: true }
   })

   return employees
}

export const getDatasProcurments = async () => {
   const procurments = await prisma.user.findMany({
      where: { role: "PROCUREMENT" },
      select: { id: true, name: true, email: true }
   })

   return procurments
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

// ======================== edit servicee =================================

export const getOneVendor = async (vendorId: string) => {
   const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { id: true, name: true, email: true, phone: true, address: true }
   })

   return vendor
}

export const editVendor = async (vendorId: string, data: CreateVendor) => {
   const checkVendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
      select: { id: true, name: true, email: true, phone: true, address: true }
   })

   if (!checkVendor) throw new NotFound("Vendor not found")

   const putVendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: {
         name: data.name,
         email: data.email,
         phone: data.phone,
         address: data.address
      }
   })

   return putVendor
}
