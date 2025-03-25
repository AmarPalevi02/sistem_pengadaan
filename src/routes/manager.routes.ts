import { Router } from "express";
import * as managerController from '../controllers/manager.controller'
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";

const router = Router()

router.get(
   '/pending',
   authenticate,
   authorizeRole(["MANAGER"]),
   managerController.listPending
)

router.get(
   '/detail',
   authenticate,
   authorizeRole(["MANAGER"]),
   managerController.searchDetailByRequestId
)

router.patch(
   '/request/approve',
   authenticate,
   authorizeRole(["MANAGER"]),
   managerController.approveRequestController
)


router.patch(
   '/request/rejected',
   authenticate,
   authorizeRole(["MANAGER"]),
   managerController.rejectedRequestController
)

router.get(
   '/approval/history',
   authenticate,
   authorizeRole(["MANAGER"]),
   managerController.managerApprovalHistory
)


export default router