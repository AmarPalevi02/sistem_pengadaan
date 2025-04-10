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

export const createVendorController = async (req: Request, res: Response) => {
   try {
      const payload = req.body

      const result = await adminServices.createVendor(payload)

      res.status(201).json({
         message: 'Success created vendor',
         data: result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const getAllVendorController = async (req: Request, res: Response) => {
   try {
      const result = await adminServices.getAllVendor()

      res.status(200).json({
         message: "Succes get all vendor",
         data: result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const updateVendorController = async (req: Request, res: Response) => {
   try {
      const { vendorId } = req.params
      const payload = req.body

      const result = await adminServices.updateVendor(vendorId, payload)

      res.status(201).json({
         message: "Succes update vendor",
         data: result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const destroyVendorController = async (req: Request, res: Response) => {
   try {
      const { vendorId } = req.params

      const result = await adminServices.destroyVendor(vendorId)

      res.status(200).json({
         message: "Succes deleted vendor",
         data: result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}