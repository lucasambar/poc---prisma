import { Router } from "express";
import { deleteOne, getDepartments, insertOrUpdateDepartment } from "../controllers/departments.controllers.js";
import { bodyValidation } from "../middlewares/bodyValidation.js";
import { departmentSchema } from "../schemas.js";
// import { employeesDepartment, validateBody, validateDepartmentId } from "../middlewares/departments.middlewares.js";

const router = Router()

router.get("/departments", getDepartments)
router.post("/departments", bodyValidation(departmentSchema), insertOrUpdateDepartment)
router.put("/departments/:id", bodyValidation(departmentSchema), insertOrUpdateDepartment)
router.delete("/departments/:id", deleteOne)

export default router