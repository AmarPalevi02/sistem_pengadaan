import { Request, Response } from 'express'
import * as authService from '../services/auth.service'

export const register = async (req: Request, res: Response) => {
   try {
      const admin = (req as any).user;

      if (!admin || admin.role !== 'ADMIN') {
         res.status(403).json({ message: 'Forbidden: Only admin can create accounts' });
         return;
      }

      const { name, email, password, role } = req.body;

      const allowedRoles = ['EMPLOYEE', 'MANAGER', 'PROCUREMENT'];
      if (!allowedRoles.includes(role)) {
         res.status(400).json({ message: 'Invalid role provided' });
         return;
      }

      const result = await authService.register(name, email, password, role);

      res.status(201).json({
         message: "New user created",
         result
      });
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
};

export const login = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json({
         message: "Succes login",
         result
      });
   } catch (error: any) {
      res.status(400).json({ error: error.message });
   }
};