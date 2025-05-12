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

router.get(
   '/employees',
   authenticate,
   authorizeRole(['ADMIN']),
   userController.getAllEmployee
)

router.get(
   '/procutments',
   authenticate,
   authorizeRole(['ADMIN']),
   userController.getAllProcurment
)

router.get(
   '/managers',
   authenticate,
   authorizeRole(['ADMIN']),
   userController.getAllManager
)

router.delete(
   `/:userId/delet`,
   authenticate,
   authorizeRole(['ADMIN']),
   userController.deleteUserController
)

router.post(
   '/vendor/create',
   authenticate,
   authorizeRole(['ADMIN']),
   userController.createVendorController
)

router.get(
   "/vendor",
   authenticate,
   authorizeRole(['ADMIN']),
   userController.getAllVendorController
)

router.put(
   '/vendor/:vendorId/update',
   authenticate,
   authorizeRole(['ADMIN']),
   userController.updateVendorController
)

router.delete(
   '/vendor/:vendorId',
   authenticate,
   authorizeRole(['ADMIN']),
   userController.destroyVendorController
)


export default router;
