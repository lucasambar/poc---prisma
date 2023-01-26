import { selectDepartments, selectEmployeesCount } from "../repositories/departments.repositories.js"

async function getDepartments () {
    const departments = await selectDepartments()
    const response = []
    for (let a of departments) {
        const count = await selectEmployeesCount(a.id)
        response.push ({
            id: a.id,
            name: a.name,
            employeeCount: count._count.departament_id
        })
    }
    return response
}


const departmentsServices = {
    getDepartments,
}

export default departmentsServices