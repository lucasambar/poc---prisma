import { Request, Response } from "express";
import { Department, DepartmentEntity } from "../protocols.js";
import { deleteDepartment, upsertDepartment } from "../repositories/departments.repositories.js";
import departmentsServices from "../services/departments.services.js";

export async function getDepartments (req: Request, res: Response) {
    const a = await departmentsServices.getDepartments()
    res.send(a)
}

export async function insertOrUpdateDepartment (req: Request, res: Response) {
    const body = res.locals.body as DepartmentEntity
    await upsertDepartment(body)
    res.sendStatus(201)
}

export async function deleteOne (req: Request, res: Response) {
    const id = Number(res.locals.body.id)
    await deleteDepartment(id)
    res.sendStatus(204)
}