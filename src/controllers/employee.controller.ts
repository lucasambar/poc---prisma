import { Request, Response } from "express";
import { QueryParams } from "../protocols.js";
import employeeServices from "../services/employee.services.js";

export async function getEmployees(req: Request, res: Response) {
  const department = Number(req.query.department_id) as QueryParams;
  const position = Number(req.query.position_id) as QueryParams;

  const response = await employeeServices.get(department, position);
  res.send(response);
}

export async function upsert(req: Request, res: Response) {
  const body = req.body;
  const { id } = req.params;

  await employeeServices.upsert({ id, ...body });
  res.sendStatus(201);
}
export async function deleteOne(req: Request, res: Response) {
  const { id } = req.params;
  await employeeServices.del(Number(id));
  res.sendStatus(204);
}
