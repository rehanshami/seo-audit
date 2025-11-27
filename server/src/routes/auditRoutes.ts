import { Router } from "express";
import { auditWebsiteController } from "../controllers/auditController.js";
import { validateAuditRequest } from "../validators/auditValidator.js";

const router = Router();

router.post("/", validateAuditRequest, auditWebsiteController);

export default router;
