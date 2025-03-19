import { Request, Response } from 'express'
import * as managerServices from '../services/manager.service'
import { BadRequestError } from '../errors'

export const listPending = async (req: Request, res: Response) => {
   try {
      const result = await managerServices.getPendingRequest()

      res.status(200).json({
         message: "Success get list pending",
         result
      })
   } catch (error: any) {
      throw new BadRequestError(error.masagge)
   }
}

export const searchDetailByRequestId = async (req: Request, res: Response) => {
   try {
      const { requestNumber } = req.query

      if (!requestNumber) {
         throw new Error('requestNumber is required');
      }

      const result = await managerServices.getRequestDetail(requestNumber as string)

      res.status(200).json({
         message: "Success search",
         result
      })
   } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
   }
}

export const approveRequestController = async (req: Request, res: Response) => {
   try {
      const { requestNumber } = req.query
      const { notes } = req.body

      if (!requestNumber) {
         throw new Error('requestNumber is required');
      }

      const manager = (req as any).user;
      const managerId = manager.id;
      const approvalByManager = manager.name

<<<<<<< HEAD
=======
      const approvalByManager = manager.name

>>>>>>> 79ac6f0fdf128db32635382930d471e3a2946aae
      const result = await managerServices.approveRequest(requestNumber as string, managerId, approvalByManager, notes)

      res.status(201).json({
         message: "Request approved succes",
         result
      })

   } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
   }
}


export const rejectedRequestController = async (req: Request, res: Response) => {
   try {
      const { requestNumber } = req.query
      const { notes } = req.body

      if (!requestNumber) {
         throw new Error('requestNumber is required');
      }

      const manager = (req as any).user;
      const managerId = manager.id;

      const rejectByManager = manager.name

      const result = await managerServices.rejectRequest(requestNumber as string, managerId, rejectByManager, notes)

      res.status(201).json({
         message: "Request rejected success",
         result
      })

   } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
   }
}

export const managerApprovalHistory = async (req: Request, res: Response) => {
   try {
      const manager = (req as any).user;
      const managerId = manager.id;

      const result = await managerServices.getManagerApprovalHistory(managerId)

      res.status(200).json({
         message: "Succes get history approve and reject",
         result
      })

   } catch (error) {

   }
} 
