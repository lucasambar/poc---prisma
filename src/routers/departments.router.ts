import { Router } from "express";
import { getDepartments } from "../controllers/departments.controllers.js";

const router = Router()

router.get("/departments", getDepartments)
router.post("/departments")
router.put("/departments")
router.delete("/departments")

export default router