import { Request, Response, NextFunction } from "express";
import { Employee, NewEmployee } from "../protocols.js";
import {
  findDepartaments,
  findEmployeeByEmail,
  findPositions,
  findEmployees,
} from "../repositories.js";
import { employeeSchema } from "../schemas.js";

export async function validateBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = res.locals.body as Employee;

  const validation = employeeSchema.validate(body, { abortEarly: false });
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    res.status(422).send(erros);
    return;
  }

  try {
    const { email, departament_id, position_id } = body;

    const departamentDB = await findDepartaments(departament_id);
    if (!departamentDB)
      return res.status(404).send("Department not found in database.");

    const positionDB = await findPositions(position_id);
    if (!positionDB)
      return res.status(404).send("Position not found in database.");

    const employeeDB = await findEmployeeByEmail(email);
    if (employeeDB) {
      if (!body.id || employeeDB.id !== body.id)
        return res.status(404).send("Email already used by another employee");
    }

    res.locals.body = body;

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function validateEmployeeId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id  = Number(req.params.id);
  const body = req.body as Employee;
  
  try {
    const employeeDB = await findEmployees(Number(id));

    if (!employeeDB)
      return res.status(404).send("Employee not found in database");

    res.locals.body = { id, ...body };
    
    next()
  } catch (erro) {
    console.log(erro);
    res.sendStatus(500);
  }
}
