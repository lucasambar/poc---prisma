import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export function bodyValidation(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const validation = schema.validate(body, { abortEarly: false });
    if (validation.error) {
      const erros = validation.error.details.map((detail) => detail.message);
      throw { status: 422, message: erros };
    }

    next();
  };
}
