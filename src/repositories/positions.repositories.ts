import { departaments } from "@prisma/client";
import prisma from "../database.js";
import { NewDepartment, NewPosition, Position } from "../protocols.js";

export function selectPositions ()  {
    return prisma.positions.findMany()
}

export function selectEmployeesCount (department_id: number) {
    return prisma.employees.aggregate({
        _count: {
            departament_id: true,
        },
        where:  {
            departament_id: department_id,
        }
    })
}

export function selectPositionByName (name: string) {
    return prisma.positions.findFirst({
        where: {
            name: name
        }
    })
}

export function selectPositionById (id: number) {
    return prisma.positions.findFirst({
        where: {
            id: id,
        }
    })
}

export function upsertPosition (body: Position) {
    return prisma.positions.upsert({
        create: body as NewPosition,
        update: body,
        where: {
          id: body.id || 0,
        },
        })
}

export function deletePosition (id: number) {
    return prisma.positions.delete({
        where: {
            id: id
        }
    })
}

export function selectEmployeeByPosition (id: number) {
    return prisma.employees.findMany({
        where: {
            position_id: id
        }
    })
}