import { departments } from "@prisma/client";
import prisma from "../database.js";
import { NewDepartment } from "../protocols.js";

export function selectDepartments ()  {
    return prisma.departments.findMany()
}

export function selectEmployeesCount (department_id: number) {
    return prisma.employees.aggregate({
        _count: {
            department_id: true,
        },
        where:  {
            department_id: department_id,
        }
    })
}

export function selectDepartmentByName (name: string) {
    return prisma.departments.findFirst({
        where: {
            name: name
        }
    })
}

export function selectDepartmentById (id: number) {
    return prisma.departments.findFirst({
        where: {
            id: id,
        }
    })
}

export function upsertDepartment (body: departments) {
    const id = Number(body.id)
    return prisma.departments.upsert({
        create: {name: body.name} as NewDepartment,
        update: {id, name: body.name},
        where: {
          id: id || 0,
        },
        })
}

export function deleteDepartment (id: number) {
    return prisma.departments.delete({
        where: {
            id: id
        }
    })
}

export function selectEmployeeByDepartment(id: number) {
    return prisma.employees.findMany({
        where: {
            department_id: id
        }
    })
}