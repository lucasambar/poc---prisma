import express from "express";
import cors from "cors";

import testes from "./testes.js";
import EmployeeRouter from "./routers/employee.router.js"

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => res.send("tudo certo"));
app.use(EmployeeRouter)
// app.get("/employee", get);
// app.post("/employee", validateRequest, post);
// app.put("/employee/:id", validateEmployeeId, validateRequestUpdate, put);
// app.delete("/employee/:id", validateEmployeeId, deleteOne);

app.get("/teste", testes)
app.listen(5000, () => {
  console.log("Projeto rodando na porta 5000. :)");
});
