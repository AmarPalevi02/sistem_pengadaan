import * as adminServices from "../services/admin.service"
import { Request, Response } from 'express';

export const updateUser = async (req: Request, res: Response) => {
   try {
      const { userId } = req.params;
      const payload = req.body;


      const updatedUser = await adminServices.updateUser(userId, payload);

      res.status(200).json({
         message: "Succes update user",
         data: updatedUser
      }
      );
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
};

export const deleteUserController = async (req: Request, res: Response) => {
   try {
      const { userId } = req.params

      const result = await adminServices.deleteUser(userId)

      res.status(200).json({ result })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
} 
