import { Router } from "express";
import { getDepartments } from "../controllers/departments.controllers.js";

const router = Router()

router.get("/position", getDepartments)
router.post("/position")
router.put("/position")
router.delete("/position")

export default router