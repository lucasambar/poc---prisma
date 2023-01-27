import { Request, Response } from "express";
import { PositionEntity, Position } from "../protocols.js";
import positonServices from "../services/positions.services.js";

export async function getPositions(req: Request, res: Response) {
  const response = await positonServices.get();
  res.send(response);
}

export async function insertOrUpdatePosition(req: Request, res: Response) {
  const id = req.params.id as string | number;
  const body = req.body as Position;
  await positonServices.upsert({id,... body});
  res.sendStatus(201);
}

export async function deleteOne(req: Request, res: Response) {
  const id = Number(req.params.id);
  await positonServices.delet(id);
  res.sendStatus(204);
}
