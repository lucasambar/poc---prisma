import { Employee, QueryParams } from "../protocols";
import {
  selectAll,
  upsertEmployee,
  deleteEmployee,
  finddepartments,
  findPositions,
  findEmployeeByEmail,
  findEmployees,
} from "../repositories/employee.repositories.js";

function inssCalculator(salary: number) {
  if (salary <= 130200) {
    return salary * 0.075;
  } else if (salary <= 257129) {
    return salary * 0.09;
  } else if (salary <= 385694) {
    return salary * 0.12;
  } else if (salary <= 750749) {
    return salary * 0.14;
  } else {
    return 750749 * 0.14;
  }
}

function irCalculator(aux: number) {
  if (aux <= 190398) {
    return 0;
  } else if (aux <= 282665) {
    return aux * 0.075 - 14280;
  } else if (aux <= 375105) {
    return aux * 0.15 - 35480;
  } else if (aux <= 466468) {
    return aux * 0.225 - 63613;
  } else {
    return aux * 0.275 - 86936;
  }
}

function calculateBrCharges(salary: number) {
  const inss_patronal: number = salary * 0.268;
  const fgts: number = salary * 0.08;
  const inss = inssCalculator(salary);
  const ir = irCalculator(salary - inss);
  const salario_liquido: number = salary - inss - ir;

  return {
    gross_salary: `R$ ${(salary / 100).toFixed(2)}`,
    net_salary: `R$ ${(salario_liquido / 100).toFixed(2)}`,
    inss: `R$ ${(inss / 100).toFixed(2)}`,
    ir: `R$ ${(ir / 100).toFixed(2)}`,
    inss_business: `R$ ${(inss_patronal / 100).toFixed(2)}`,
    fgts: `R$ ${(fgts / 100).toFixed(2)}`,
  };
}

async function get(department: QueryParams, position: QueryParams) {
  const rows = await selectAll(department, position);
  const response = rows.map((emp) => {
    return {
      id: emp.id,
      name: emp.name,
      email: emp.email,
      department: emp.departments.name,
      position: emp.positions.name,
      payrollBr: calculateBrCharges(emp.positions.salary),
    };
  });
  return response;
}

async function upsert(body: Employee) {
  let { id, name, email, department_id, position_id } = body;

  if (id) {
    id = Number(id);
    const employeeDB = await findEmployees(Number(id));

    if (!employeeDB)
      throw { status: 404, send: "Employee not found in database" };
  }

  const departmentDB = await finddepartments(department_id);
  if (!departmentDB)
    throw { status: 404, message: "Department not found in database." };

  const positionDB = await findPositions(position_id);
  if (!positionDB)
    throw { status: 404, message: "Position not found in database." };

  const employeeDB = await findEmployeeByEmail(email);
  if (employeeDB) {
    if (!body.id || employeeDB.id !== id)
      throw { status: 404, message: "Email already used by another employee" };
  }

  return await upsertEmployee({ id, name, email, department_id, position_id });
}

async function del (id: number) {
  const employeeDB = await findEmployees(Number(id));

  if (!employeeDB)
    throw {status:(404),message:("Employee not found in database")};

  return await deleteEmployee(Number(id));
}
const employeeServices = {
  get,
  upsert,
  del
};

export default employeeServices;
