import {Request, Response, NextFunction} from "express"
import { Error } from "../protocols";

export function errorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
    if (error.status) return res.status(error.status).send(error.message)
    return res.status(500).send(error.message)
}