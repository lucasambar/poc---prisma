import Joi from "joi"

export const employeeSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    position_id: Joi.number().required(),
    departament_id: Joi.number().required()
})

export const departmentSchema = Joi.object({
    id: Joi.number(),
    name:Joi.string().min(3).required(),
})