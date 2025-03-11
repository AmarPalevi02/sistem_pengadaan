import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
   const token = req.headers.authorization?.split(' ')[1];

   if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return; 
   }

   try {
      const decoded = verifyToken(token);
      (req as any).user = decoded; 

      next(); 
   } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
   }
};
