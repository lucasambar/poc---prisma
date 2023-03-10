import prisma from "../database.js";
import {
  GetResponse,
  NewEmployee,
  Employee,
  QueryParams,
} from "../protocols.js";

export function finddepartments(id: number) {
  return prisma.departments.findFirst({
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
        departments: true,
        positions: true,
      },
      where: {
        department_id: department,
        position_id: position,
      },
    });
  if (position)
    return prisma.employees.findMany({
      include: {
        departments: true,
        positions: true,
      },
      where: {
        position_id: position,
      },
    });
  if (department)
    return prisma.employees.findMany({
      include: {
        departments: true,
        positions: true,
      },
      where: {
        department_id: department,
      },
    });
  return prisma.employees.findMany({
    include: {
      departments: true,
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

export function deleteEmployee(id: number) {
  return prisma.employees.delete({
    where: {
      id: id,
    },
  });
}
