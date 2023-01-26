import { Router } from "express";
import { getDepartments } from "../controllers/departments.controllers.js";
import { validateBody, validateDepartmentId } from "../middlewares/departments.middlewares.js";

const router = Router()

router.get("/departments", getDepartments)
router.post("/departments", (req, res, next) => {
    res.locals.body = req.body
    next()
}, validateBody)
router.put("/departments", validateDepartmentId, validateBody)
router.delete("/departments", validateDepartmentId)

export default router