import { findDepartaments, findEmployees, findPositions } from "./repositories/employee.repositories.js";

export default async function testes (req, res) {
    const {id} = req.body
    const a = await findDepartaments(id)
    if (a) console.log("a", a)
    const b = await findEmployees(id)
    console.log("b", b)
    const c =await findPositions(id)
    console.log("c", c)

    res.send("ok")
}