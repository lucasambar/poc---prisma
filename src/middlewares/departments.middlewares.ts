import { Request, Response, NextFunction } from "express";
import { Department } from "../protocols.js";
import { selectDepartmentById, selectDepartmentByName } from "../repositories/departments.repositories.js";
import { departmentSchema } from "../schemas.js";

export async function validateBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = res.locals.body as Department;

  const validation = departmentSchema.validate(body, { abortEarly: false });
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    res.status(422).send(erros);
    return;
  }

  const departmentDB = await selectDepartmentByName(body.name);
  if (departmentDB)
    return res
      .status(422)
      .send(`Department already inserted in DB with id: ${departmentDB.id}`);


}


export async function validateDepartmentId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id  = Number(req.params.id);
    const body = req.body as Department;
    
    try {
      const departmentDB = await selectDepartmentById(id);
  
      if (!departmentDB)
        return res.status(404).send("Department not found in database");
  
      res.locals.body = { id, ...body };
      
      next()
    } catch (erro) {
      console.log(erro);
      res.sendStatus(500);
    }
  }
  