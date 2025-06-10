import * as adminServices from "../services/admin.service"
import { Request, Response } from 'express';

export const getOneAcountController = async (req: Request, res: Response) => {
   try {
      const { userId } = req.params

      const data = await adminServices.getOneUser(userId)

      res.status(200).json({
         message: "success",
         error: false,
         data: data
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const updateUser = async (req: Request, res: Response) => {
   try {
      const { userId } = req.params;
      const payload = req.body;

      const updatedUser = await adminServices.updateUser(userId, payload);

      res.status(200).json({
         message: "Succes update user",
         data: updatedUser
      });
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
};

export const getAllEmployee = async (req: Request, res: Response) => {
   try {
      const result = await adminServices.getAllUserEmployee()

      res.status(200).json({
         message: "Succes",
         status: 200,
         data: result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const getAllProcurment = async (req: Request, res: Response) => {
   try {
      const result = await adminServices.getAllUserProcurment()

      res.status(200).json({
         message: "Succes",
         status: 200,
         data: result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const getAllManager = async (req: Request, res: Response) => {
   try {
      const result = await adminServices.getAllUserManager()

      res.status(200).json({
         message: "Succes",
         status: 200,
         data: result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const getDatasManagersController = async (req: Request, res: Response) => {
   try {
      const result = await adminServices.getDatasManagers()

      res.status(200).json({
         message: "Succes",
         status: 200,
         data: result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const getDatasEmployeesController = async (req: Request, res: Response) => {
   try {
      const result = await adminServices.getDatasEmpoyees()

      res.status(200).json({
         message: "Succes",
         status: 200,
         data: result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const getDatasProcurmentsController = async (req: Request, res: Response) => {
   try {
      const result = await adminServices.getDatasProcurments()

      res.status(200).json({
         message: "Succes",
         status: 200,
         data: result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const deleteUserController = async (req: Request, res: Response) => {
   try {
      const { userId } = req.params

      const result = await adminServices.deleteUser(userId)

      res.status(200).json({
         message: "Succes deleted vendor",
         data: result
      })
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

export const countVendorsController = async (req: Request, res: Response) => {
   try {
      const result = await adminServices.getCountVendor()

      res.status(200).json({
         message: "Succes",
         status: 200,
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

//========================== edit controller ===================

export const getOneVendorController = async (req: Request, res: Response) => {
   try {
      const { vendorId } = req.params
      const data = await adminServices.getOneVendor(vendorId)

      res.status(200).json({
         message: "success",
         error: false,
         data: data
      })

   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}

export const putVendorController = async (req: Request, res: Response) => {
   try {
      const { vendorId } = req.params
      const payload = req.body

      const data = await adminServices.editVendor(vendorId, payload)

      res.status(201).json({
         message: "success",
         error: false,
         data: data
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }

}