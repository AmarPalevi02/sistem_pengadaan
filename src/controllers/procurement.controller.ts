import { Request, Response } from 'express'
import * as procurementServices from '../services/procurement.service'

export const getAllProcurements = async (req: Request, res: Response) => {
   try {
      const status = req.query.status as any
      const procurements = await procurementServices.getAllProcurements(status)

      res.status(200).json({
         message: 'Get all procurements success',
         data: procurements
      })
   } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
   }
}

export const getProcurementById = async (req: Request, res: Response) => {
   try {
      const { id } = req.params

      const result = await procurementServices.getProcurementById(id)

      res.status(200).json({
         message: 'Get procurement by id success',
         data: result
      })
   } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
   }
}

export const createProcurement = async (req: Request, res: Response) => {
   try {
      const payload = req.body

      const procurment = (req as any).user
      const procurementOfficerId = procurment.id

      const result = await procurementServices.createProcrutment(payload, procurementOfficerId)

      res.status(201).json({
         message: 'Create procurement success',
         result
      })
   } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
   }
}

export const updateProcurmentStatusController = async (req: Request, res: Response) => {
   try {

      const { id } = req.params
      const { status, notes } = req.body

      const procurment = (req as any).user
      const updatedById = procurment.id

      console.log(status)
      console.log(notes)

      const result = await procurementServices.updateProcurmentStatus(
         id,
         updatedById,
         status,
         notes)

      res.status(201).json({
         message: 'Update status procurement success',
         data: result
      })
   } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
   }
}