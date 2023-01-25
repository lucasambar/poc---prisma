import { QueryResult } from "pg";
import prisma from "./database.js";
import { GetResponse, NewEmployee, Employee,QueryParams} from "./protocols.js";

export function findDepartaments(id: number) {
  return prisma.departaments.findFirst({
    where : {
      id: id,
    }
  })
}

export function findPositions(id: number) {
  return prisma.positions.findFirst({
    where: {
      id: id,
    }
  })
}

export function findEmployeeByEmail(email: string) {
  return prisma.employees.findFirstOrThrow({
    where: {
      email: email,
    }
  })
}
export function findEmployees(id: number) {
  return prisma.employees.findFirst({
    where: {
      id: id,
    }
  })
}

export function selectAll() {
  return prisma.employees.findMany({
    include: {
      departaments: true,
      positions: true
    }
  })
}

// export function selectAll(department: QueryParams, position: QueryParams): Promise<QueryResult<GetResponse>> {
//     const baseQuery = `
//         SELECT
//             e.id,
//             e.name,
//             e.email,
//             p.name AS position,
//             p.salary,
//             d.name AS departament
//         FROM employees e
//         JOIN positions p ON e.position_id = p.id
//         JOIN departaments d ON e.departament_id = d.id
//     `;
//     if (position && department) return connection.query(baseQuery + "WHERE position_id=$1 AND departament_id=$2", [position,department])
//     if (department) return connection.query(baseQuery + "WHERE departament_id=$1", [department])
//     if (position) return connection.query(baseQuery + "WHERE position_id=$1", [position])
//     return connection.query(baseQuery)
// }

export function upsertEmployee(body: Employee) {
  return prisma.employees.upsert({
    create: body as NewEmployee,
    update: body,
    where: {
      id: body.id || 0,
    }
  })
}

// export function putEmployee(
//   body: RequestBody,
//   id: number
// ): Promise<QueryResult> {
//   const { name, email, position_id, departament_id } = body;
//   return connection.query(
//     `UPDATE employees 
//      SET 
//       name=$1, 
//       email=$2, 
//       position_id=$3,
//       departament_id=$4
//      WHERE id=$5`,
//     [name, email, position_id, departament_id, id]
//   );
// }

export function deleteEmployee (id: number){
  return prisma.employees.delete({
    where: {
      id: id,
    }
  })
}