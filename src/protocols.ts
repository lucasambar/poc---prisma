export type EmployeeEntity = {
    id: number,
    name: string,
    email: string,
    position_id: number,
    department_id: number
}
export type NewEmployee = Omit<EmployeeEntity, "id">
export type Employee = Partial<EmployeeEntity>

export type GetResponse = {
    id?: number,
    name: string,
    email: string,
    position: string,
    salary: number,
    department: string
}

export type QueryParams = number | undefined

export type DepartmentEntity = {
    id: number,
    name: string
}
export type NewDepartment = Omit<DepartmentEntity, "id">
export type Department = Partial<DepartmentEntity>

export type PositionEntity = {
    id?: number,
    name: string,
    salary: number
}
export type NewPosition = Omit<PositionEntity, "id">
export type Position = Partial<PositionEntity>

export type Error = {
    status: number,
    message: any
}