import { Request, Response } from "express";
import { selectAll } from "../repositories.js";
import { calculateBrCharges } from "../services/employee.services.js";

export async function getEmployees (req: Request, res: Response) {
  try {
    const rows = await selectAll()
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
