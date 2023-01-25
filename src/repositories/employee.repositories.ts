import prisma from "../database.js";
import {
  GetResponse,
  NewEmployee,
  Employee,
  QueryParams,
} from "../protocols.js";

export function findDepartaments(id: number) {
  return prisma.departaments.findFirst({
    where: {
      id: id,
    },
  });
}

export function findPositions(id: number) {
  return prisma.positions.findFirst({
    where: {
      id: id,
    },
  });
}

export function findEmployeeByEmail(email: string) {
  return prisma.employees.findFirst({
    where: {
      email: email,
    },
  });
}
export function findEmployees(id: number) {
  return prisma.employees.findFirst({
    where: {
      id: id,
    },
  });
}

export function selectAll(department: QueryParams, position: QueryParams) {
  if (position && department)
    return prisma.employees.findMany({
      include: {
        departaments: true,
        positions: true,
      },
      where: {
        departament_id: department,
        position_id: position,
      },
    });
  if (position)
    return prisma.employees.findMany({
      include: {
        departaments: true,
        positions: true,
      },
      where: {
        position_id: position,
      },
    });
  if (department)
    return prisma.employees.findMany({
      include: {
        departaments: true,
        positions: true,
      },
      where: {
        departament_id: department,
      },
    });
  return prisma.employees.findMany({
    include: {
      departaments: true,
      positions: true,
    },
  });
}

export function upsertEmployee(body: Employee) {
  return prisma.employees.upsert({
    create: body as NewEmployee,
    update: body,
    where: {
      id: body.id || 0,
    },
  });
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

export function deleteEmployee(id: number) {
  return prisma.employees.delete({
    where: {
      id: id,
    },
  });
}
