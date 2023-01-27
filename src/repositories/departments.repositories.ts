import { departaments } from "@prisma/client";
import prisma from "../database.js";
import { NewDepartment } from "../protocols.js";

export function selectDepartments ()  {
    return prisma.departaments.findMany()
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

export function selectDepartmentByName (name: string) {
    return prisma.departaments.findFirst({
        where: {
            name: name
        }
    })
}

export function selectDepartmentById (id: number) {
    return prisma.departaments.findFirst({
        where: {
            id: id,
        }
    })
}

export function upsertDepartment (body: departaments) {
    const id = Number(body.id)
    return prisma.departaments.upsert({
        create: {name: body.name} as NewDepartment,
        update: {id, name: body.name},
        where: {
          id: id || 0,
        },
        })
}

export function deleteDepartment (id: number) {
    return prisma.departaments.delete({
        where: {
            id: id
        }
    })
}

export function selectEmployeeByDepartment(id: number) {
    return prisma.employees.findMany({
        where: {
            departament_id: id
        }
    })
}