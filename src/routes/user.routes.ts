import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorizeRole } from '../middlewares/role.middleware';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/createakun', authenticate, authController.register)
router.put(
   '/:userId/role',
   authenticate,
   authorizeRole(['ADMIN']),
   userController.updateUserRole
);

export default router;
