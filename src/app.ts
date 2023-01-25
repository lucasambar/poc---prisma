import express from "express";
import cors from "cors";

import EmployeeRouter from "./routers/employee.router.js"

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => res.send("tudo certo"));
app.use(EmployeeRouter)

app.listen(5000, () => {
  console.log("Projeto rodando na porta 5000. :)");
});
