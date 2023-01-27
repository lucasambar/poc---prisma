import express from "express";
import "express-async-errors";
import cors from "cors";

import EmployeeRouter from "./routers/employee.router.js"
import DepartmentRouter from "./routers/departments.router.js"
import PositionRouter from "./routers/positions.router.js"
import { errorHandler } from "./middlewares/errorhandler.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => res.send("tudo certo"));
app.use(EmployeeRouter)
app.use(DepartmentRouter)
app.use(PositionRouter)
app.use(errorHandler)

app.listen(5000, () => {
  console.log("Projeto rodando na porta 5000. :)");
});
