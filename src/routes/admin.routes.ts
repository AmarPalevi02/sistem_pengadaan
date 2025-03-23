import { Router } from 'express';
import * as userController from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post(
   '/createakun',
   authenticate,
   authorizeRole(['ADMIN']),
   authController.register)
   
router.put(
   '/update/:userId',
   authenticate,
   authorizeRole(['ADMIN']),
   userController.updateUser
);

export default router;
