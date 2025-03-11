import prisma from '../../prisma/prismaClient';
import { Request, Response } from 'express';

export const updateUserRole = async (req: Request, res: Response) => {
   const { userId } = req.params;
   const { role } = req.body;

   try {
      const updatedUser = await prisma.user.update({
         where: { id: String(userId) },
         data: { role },
      });

      res.status(200).json(updatedUser);
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
};
