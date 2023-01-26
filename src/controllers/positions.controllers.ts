import { Request, Response } from "express";
import { PositionEntity } from "../protocols.js";
import { deletePosition, selectPositions, upsertPosition } from "../repositories/positions.repositories.js";
import departmentsServices from "../services/departments.services.js";

export async function getPositions (req: Request, res: Response) {
    const a = await selectPositions()
    res.send(a)
}

export async function insertOrUpdatePosition (req: Request, res: Response) {
    const body = res.locals.body as PositionEntity
    await upsertPosition(body)
    res.sendStatus(201)
}

export async function deleteOne (req: Request, res: Response) {
    const id = Number(res.locals.body.id)
    await deletePosition(id)
    res.sendStatus(204)
}