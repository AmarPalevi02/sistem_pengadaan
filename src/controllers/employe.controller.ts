import { Request, Response } from 'express'
import * as employeService from '../services/employe.service'

export const createRequestController = async (req: Request, res: Response) => {
   try {
      const employee = (req as any).user;
      const employeeId = employee.id;
      
      const result = await employeService.createRequest(req.body, employeeId)
      
      res.status(201).json({
         message: "Employe succes request",
         result
      })
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
}