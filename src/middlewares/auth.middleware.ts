import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { Unauthenticated } from '../errors';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
   const token = req.headers.authorization?.split(' ')[1];

   if (!token) {
      throw new Unauthenticated("Unauthorized")
   }

   try {
      const decoded = verifyToken(token);
      (req as any).user = decoded;

      next();
   } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
   }
};
