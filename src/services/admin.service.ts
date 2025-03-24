import prisma from "../../prisma/prismaClient";
import { NotFound } from "../errors";
import { UpdateUser } from "../types/createUser";
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