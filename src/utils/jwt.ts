import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '1d'

if (!JWT_SECRET) {
   throw new Error("JWT_SECRET is not defined in environment variables!")
}

export const generateToken = (payload: object) => {
   return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token: string) => {
   return jwt.verify(token, JWT_SECRET)
}