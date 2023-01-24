import { QueryResult } from "pg";
import { connection } from "./database.js";
import { GetResponse, QueryParams, RequestBody } from "./protocols.js";

export function findDepartaments(id: number): Promise<QueryResult> {
  return connection.query("SELECT * FROM departaments WHERE id=$1", [id]);
}

export function findPositions(id: number): Promise<QueryResult> {
  return connection.query("SELECT * FROM positions WHERE id=$1", [id]);
}

export function findEmployeeByEmail(email: string): Promise<QueryResult> {
  return connection.query("SELECT * FROM employees WHERE email=$1", [email]);
}
export function findEmployees(id: number): Promise<QueryResult> {
  return connection.query("SELECT * FROM employees WHERE id=$1", [id]);
}

export function selectAll(department: QueryParams, position: QueryParams): Promise<QueryResult<GetResponse>> {
    const baseQuery = `
        SELECT
            e.id,
            e.name,
            e.email,
            p.name AS position,
            p.salary,
            d.name AS departament
        FROM employees e
        JOIN positions p ON e.position_id = p.id
        JOIN departaments d ON e.departament_id = d.id
    `;
    if (position && department) return connection.query(baseQuery + "WHERE position_id=$1 AND departament_id=$2", [position,department])
    if (department) return connection.query(baseQuery + "WHERE departament_id=$1", [department])
    if (position) return connection.query(baseQuery + "WHERE position_id=$1", [position])
    return connection.query(baseQuery)
}

export function insertNewEmployee(body: RequestBody): Promise<QueryResult> {
  const { name, email, position_id, departament_id } = body;
  return connection.query(
    "INSERT INTO employees (name, email, position_id, departament_id) VALUES ($1,$2,$3,$4)",
    [name, email, position_id, departament_id]
  );
}

export function putEmployee(
  body: RequestBody,
  id: number
): Promise<QueryResult> {
  const { name, email, position_id, departament_id } = body;
  return connection.query(
    `UPDATE employees 
     SET 
      name=$1, 
      email=$2, 
      position_id=$3,
      departament_id=$4
     WHERE id=$5`,
    [name, email, position_id, departament_id, id]
  );
}

export function deleteEmployee (id: number): Promise<QueryResult> {
  return connection.query('DELETE FROM employees WHERE id = $1',[id])
}