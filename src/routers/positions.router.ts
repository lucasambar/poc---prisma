import { Router } from "express";
import { deleteOne, getPositions, insertOrUpdatePosition } from "../controllers/positions.controllers.js";
import { bodyValidation } from "../middlewares/bodyValidation.js";
import { employeePosition, validateBody, validatePositonId } from "../middlewares/positions.middlewares.js";
import { positionSchema } from "../schemas.js";

const router = Router()

router.get("/positions", getPositions)
router.post("/positions", bodyValidation(positionSchema), insertOrUpdatePosition) 
router.put("/positions/:id", bodyValidation(positionSchema), insertOrUpdatePosition)
router.delete("/positions/:id", deleteOne)

export default router