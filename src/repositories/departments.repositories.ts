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