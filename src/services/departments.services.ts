import { Department, DepartmentEntity, Employee } from "../protocols.js";
import {
  selectDepartments,
  selectEmployeesCount,
  selectDepartmentByName,
  selectEmployeeByDepartment,
  selectDepartmentById,
  deleteDepartment,
  upsertDepartment
} from "../repositories/departments.repositories.js";

async function getDepartments() {
  const departments = await selectDepartments();
  const response = [];
  for (let a of departments) {
    const count = await selectEmployeesCount(a.id);
    response.push({
      id: a.id,
      name: a.name,
      employeeCount: count._count.department_id,
    });
  }
  return response;
}

async function upsertDepartments(body: DepartmentEntity) {
    if (body.id) {
      const departmentDB = await selectDepartmentById(Number(body.id));
      if (!departmentDB)
        throw {
          status: 404,
          message: "Department not found in database",
        };
    }
    
    const departmentDB = await selectDepartmentByName(body.name);
    if (departmentDB)
      throw {
        status: 422,
        message: `Department already inserted in DB with id: ${departmentDB.id}`,
      };
  
    return await upsertDepartment(body);  
}

async function deleteOne(id: number) {
    const departmentDB = await selectDepartmentById(id);
    if (!departmentDB)
      throw {
        status: 404,
        message: "Department not found in database",
      };
  
    const employees = (await selectEmployeeByDepartment(id)) as Employee[];
    if (employees.length !== 0)
      throw {
        status: 401,
        message: {
          message:
            "This employees should be moved to other departments or deleted from database before delete this department",
          employees,
        },
      };

      return deleteDepartment(id)
}

const departmentsServices = {
  getDepartments,
  upsertDepartments,
  deleteOne,
};

export default departmentsServices;
