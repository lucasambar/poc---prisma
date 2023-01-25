import { Request, Response, NextFunction } from "express";
import { NewEmployee } from "../protocols.js";
import { findDepartaments, findEmployeeByEmail, findPositions } from "../repositories.js";
import { employeeSchema } from "../schemas.js";

export async function validateBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body as NewEmployee;

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
    if (!employeeDB)
      return res.status(422).send("Email already used by another employee");


    res.locals.body = body;

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
