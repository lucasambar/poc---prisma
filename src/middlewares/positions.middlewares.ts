import { Request, Response, NextFunction } from "express";
import { Department, Position } from "../protocols.js";
import { selectPositionById, selectPositionByName } from "../repositories/positions.repositories.js";
import { positionSchema } from "../schemas.js";

export async function validateBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = res.locals.body as Position;

  const validation = positionSchema.validate(body, { abortEarly: false });
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    res.status(422).send(erros);
    return;
  }

  const positionDB = await selectPositionByName(body.name)
  if (positionDB && positionDB.id !== body.id)
    return res
      .status(422)
      .send(`Position already inserted in DB with id: ${positionDB.id}`);

  res.locals.body = body
  next()
}


export async function validatePositonId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id  = Number(req.params.id);
    const body = req.body as Position;
    
    try {
      const positionDB = await selectPositionById(id);
  
      if (!positionDB)
        return res.status(404).send("Position not found in database");
  
      res.locals.body = { id, ...body };
      
      next()
    } catch (erro) {
      console.log(erro);
      res.sendStatus(500);
    }
  }
  