export type RequestBody = {
    name: string,
    email: string,
    position_id: number,
    departament_id: number
}

export type GetResponse = {
    id: number,
    name: string,
    email: string,
    position: string,
    salary: number,
    departament: string
}

export type QueryParams = string | undefined