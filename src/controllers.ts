import { Request, Response } from "express";
import {
  deleteEmployee,
  // insertNewEmployee,
  // putEmployee,
  // selectAll,
  upsertEmployee
} from "./repositories/employee.repositories.js";
import { Employee, NewEmployee, QueryParams } from "./protocols.js";
import { calculateBrCharges } from "./services/employee.services.js";

// export async function getEmployees (req: Request, res: Response) {
  const department = req.query.department_id as QueryParams
  const position = req.query.position_id as QueryParams

  try {
    const { rows } = {rows: []}

    const response = rows.map((employee) => {
      const playroll_br = calculateBrCharges(employee.salary);
      const aux = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        department: employee.departament,
        position: employee.position,
        playroll_br,
      };
      return aux;
    });

    res.send(response);
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}

export async function post(req: Request, res: Response) {
  const body = res.locals.body as NewEmployee;

  try {
    // await insertNewEmployee(body);
    res.send(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function put(req: Request, res: Response) {
  const body = res.locals.body as NewEmployee;
  const id = res.locals.id as number;
  const putBody: Employee = {id, ...body}

  try {
    await upsertEmployee(putBody)
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteOne(req: Request, res: Response) {
  const id = res.locals.id;

  try {
    await deleteEmployee(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

