import Joi, { number } from "joi"

export const employeeSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    position_id: Joi.number().required(),
    department_id: Joi.number().required()
})

export const departmentSchema = Joi.object({
    id: Joi.number(),
    name:Joi.string().min(3).required(),
})

export const positionSchema = Joi.object({
    id: Joi.number(),
    name:Joi.string().min(3).required(),
    salary: Joi.number().greater(130200).required()
})