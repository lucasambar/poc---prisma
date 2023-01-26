import { Router } from "express";
import { deleteOne, getDepartments, insertOrUpdateDepartment } from "../controllers/departments.controllers.js";
import { employeesDepartment, validateBody, validateDepartmentId } from "../middlewares/departments.middlewares.js";

const router = Router()

router.get("/departments", getDepartments)
router.post("/departments", (req, res, next) => {
    res.locals.body = req.body
    next()
}, validateBody, insertOrUpdateDepartment)
router.put("/departments/:id", validateDepartmentId, validateBody, insertOrUpdateDepartment)
router.delete("/departments/:id", validateDepartmentId, employeesDepartment, deleteOne)

export default router