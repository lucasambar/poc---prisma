import { Request, Response } from "express";
import { Department, DepartmentEntity } from "../protocols.js";
import { deleteDepartment, upsertDepartment } from "../repositories/departments.repositories.js";
import departmentsServices from "../services/departments.services.js";

export async function getDepartments (req: Request, res: Response) {
    const response = await departmentsServices.getDepartments()
    res.send(response)
}

export async function insertOrUpdateDepartment (req: Request, res: Response) {
    const body = req.body as DepartmentEntity
    const id = req.params.id;
    
    await departmentsServices.upsertDepartments({id, ...body})
    res.sendStatus(201)
}

export async function deleteOne (req: Request, res: Response) {
    const id = Number(req.params.id)

    await departmentsServices.deleteOne(id)
    res.sendStatus(204)
}