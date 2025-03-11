import bcrypt from "bcrypt"

const ROUNDS = 10

export const hashedPassword = async (password: string): Promise<string> => {
   return await bcrypt.hash(password, ROUNDS)
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
   return await bcrypt.compare(password, hash)
}