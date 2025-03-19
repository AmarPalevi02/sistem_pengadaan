import { Router } from "express";
import * as procurementController from '../controllers/procurement.controller'
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";

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

export default router