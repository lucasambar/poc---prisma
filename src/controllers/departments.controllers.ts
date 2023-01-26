import { Request, Response } from "express";
import departmentsServices from "../services/departments.services.js";

export async function getDepartments (req: Request, res: Response) {
    const a = await departmentsServices.getDepartments()
    res.send(a)
}