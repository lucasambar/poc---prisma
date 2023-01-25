import express from "express";
import { getEmployees } from "../controllers/employee.controller.js";
import {
  validateBody,
  validateEmployeeId,
} from "../middlewares/employee.middleware.js";

const router = express.Router();

router.get("/employee", getEmployees);
router.post("/employee",
  (req, res, next) => {
    res.locals.body = req.body;
    next();
  },
  validateBody
);
router.put("/employee/:id", validateEmployeeId, validateBody);
router.delete("/employee/:id", validateEmployeeId)
export default router;
