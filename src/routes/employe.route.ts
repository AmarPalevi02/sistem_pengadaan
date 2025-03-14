import { Router } from "express";
import * as employeContriller from '../controllers/employe.controller'
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";

const router = Router()

router.post(
   '/pengajuan',
   authenticate,
   authorizeRole(["EMPLOYEE"]),
   employeContriller.createRequestController
)

export default router