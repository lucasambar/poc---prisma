import express from "express"
import { getEmployees } from "../controllers/employee.controller.js"
import { validateBody } from "../middlewares/employee.middleware.js"

const router = express.Router()

router.get("/employee", getEmployees)
router.post("employee", validateBody)

export default router