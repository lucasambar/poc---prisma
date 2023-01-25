export type EmployeeEntity = {
    id: number,
    name: string,
    email: string,
    position_id: number,
    departament_id: number
}
export type NewEmployee = Omit<EmployeeEntity, "id">
export type Employee = Partial<EmployeeEntity>

export type GetResponse = {
    id?: number,
    name: string,
    email: string,
    position: string,
    salary: number,
    departament: string
}

export type QueryParams = number | undefined