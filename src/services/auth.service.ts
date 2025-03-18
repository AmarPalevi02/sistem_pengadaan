import { Role } from '@prisma/client'
import prisma from '../../prisma/prismaClient'
import { comparePassword, hashedPassword } from '../utils/bcrypt'
import { generateToken } from '../utils/jwt'
import { Forbidden, NotFound, Unauthorized } from '../errors'

export const register = async (name: string, email: string, password: string, role: Role) => {
   const existingUser = await prisma.user.findUnique({ where: { email } })
   if (existingUser) throw new Forbidden('User already exists')

   const hashPassword = await hashedPassword(password)

   const user = await prisma.user.create({
      data: {
         name,
         email,
         password: hashPassword,
         role
      }
   })

   return user
}

export const login = async (email: string, password: string) => {
   const user = await prisma.user.findUnique({ where: { email } });
   if (!user) throw new NotFound('User not found');

   const isPasswordValid = await comparePassword(password, user.password);
   if (!isPasswordValid) throw new Unauthorized('Invalid password');

   const token = generateToken({ id: user.id, name: user.name, role: user.role });

   const { createdAt, ...userWithoutSensitive } = user;

   return { user: userWithoutSensitive, token };
};