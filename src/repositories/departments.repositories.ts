import prisma from "../database.js";

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