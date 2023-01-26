import { QueryParams } from "../protocols";
import { selectAll, upsertEmployee, deleteEmployee } from "../repositories/employee.repositories.js";

function calculateBrCharges(salary: number) {
  const inss_patronal: number = salary * 0.268;
  const fgts: number = salary * 0.08;
  let inss: number, ir: number;

  if (salary <= 130200) {
    inss = salary * 0.075
  } else if (salary <= 257129) {
    inss = salary * 0.09
  } else if (salary <= 385694) {
    inss = salary * 0.12
  } else if (salary <= 750749) {
    inss = salary * 0.14
  } else {
    inss = 750749 * 0.14
  }
  
  const aux = salary - inss
  
  if (aux <= 190398) {
    ir = 0
  } else if (aux <= 282665) {
    ir = (aux * 0.075) - 14280
  } else if (aux <= 375105) {
    ir = aux * 0.15 - 35480
  } else if (aux <= 466468) {
    ir = aux * 0.225 - 63613
  } else {
    ir = aux * 0.275 - 86936
  }
  
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

async function get (department: QueryParams, position: QueryParams) {
  try {
    const rows = await selectAll(department, position)
    const response = rows.map(emp => {
        return {
            id: emp.id,
            name: emp.name,
            email: emp.email,
            department: emp.departaments.name,
            position: emp.positions.name,
            payrollBr: calculateBrCharges(emp.positions.salary),
        }
    })
    return response
  } catch (error) {
    console.log(error);
  }
}



const employeeServices = {
  get,
}

export default employeeServices