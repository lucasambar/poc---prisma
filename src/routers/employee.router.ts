import express from "express";
import { deleteOne, getEmployees, upsert } from "../controllers/employee.controller.js";
import { bodyValidation } from "../middlewares/bodyValidation.js";
import { employeeSchema } from "../schemas.js";

const router = express.Router();

router.get("/employee", getEmployees);
router.post("/employee", bodyValidation(employeeSchema), upsert);
router.put("/employee/:id", bodyValidation(employeeSchema), upsert);
router.delete("/employee/:id", deleteOne)

export default router;
