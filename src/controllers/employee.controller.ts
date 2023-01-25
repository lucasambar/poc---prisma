import { Request, Response } from "express";
import { QueryParams } from "../protocols.js";
import { selectAll, upsertEmployee, deleteEmployee } from "../repositories/employee.repositories.js";
import { calculateBrCharges } from "../services/employee.services.js";

export async function getEmployees (req: Request, res: Response) {
  const department = Number(req.query.department_id) as QueryParams
  const position = Number(req.query.position_id) as QueryParams

  try {
    const rows = await selectAll(department, position)
    const response = rows.map(emp => {
        return {
            id: emp.id,
            name: emp.name,
            email: emp.email,
            department: emp.departaments.name,
            position: emp.positions.name,
            payrollBr: calculateBrCharges(emp.positions.salary),
        }
    })
    res.send(response)
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
export async function upsert (req: Request, res: Response) {
  const body = res.locals.body

  try {
    await upsertEmployee(body)
    res.sendStatus(201)
  } catch (erro) {
    console.log(erro)
    res.sendStatus(500)
  }
}
export async function deleteOne(req: Request, res: Response) {
  const {id} = res.locals.body;

  try {
    await deleteEmployee(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}