import { Role } from "@prisma/client"

export interface CreateUser {
   name: string,
   email: string,
   password: string,
   role: string
}

export interface UpdateUser {
   name?: string,
   email?: string,
   password?: string,
   role?: Role
}