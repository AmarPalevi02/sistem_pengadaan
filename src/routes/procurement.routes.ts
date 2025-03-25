import { Router } from "express";
import * as procurementController from '../controllers/procurement.controller'
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";
import uploadMiddleware from "../middlewares/mullter";

const router = Router()

router.get(
   "/allprocurements",
   authenticate,
   authorizeRole(["PROCUREMENT"]),
   procurementController.getAllProcurements
)

router.get(
   "/search/:id",
   authenticate,
   authorizeRole(["PROCUREMENT"]),
   procurementController.getProcurementById
)

router.post(
   "/create",
   authenticate,
   authorizeRole(["PROCUREMENT"]),
   procurementController.createProcurement
)

router.patch(
   "/:id/status",
   authenticate,
   authorizeRole(["PROCUREMENT"]),
   procurementController.updateProcurmentStatusController
)

router.post(
   '/:id/confirm-receipt',
   uploadMiddleware.single('file'),
   authenticate,
   authorizeRole(["PROCUREMENT"]),
   procurementController.confirmReceiptController
)

export default router