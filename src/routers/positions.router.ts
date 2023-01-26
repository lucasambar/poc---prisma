import { Router } from "express";
import { deleteOne, getPositions, insertOrUpdatePosition } from "../controllers/positions.controllers.js";
import { employeePosition, validateBody, validatePositonId } from "../middlewares/positions.middlewares.js";

const router = Router()

router.get("/positions", getPositions)
router.post("/positions", (req, res, next) => {
    res.locals.body = req.body
    next()
}, validateBody, insertOrUpdatePosition) 
router.put("/positions/:id", validatePositonId, validateBody, insertOrUpdatePosition)
router.delete("/positions/:id", validatePositonId, employeePosition, deleteOne)

export default router