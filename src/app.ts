import express from "express";
import "express-async-errors";
import cors from "cors";

import EmployeeRouter from "./routers/employee.router.js";
import DepartmentRouter from "./routers/departments.router.js";
import PositionRouter from "./routers/positions.router.js";
import { errorHandler } from "./middlewares/errorhandler.js";

const app = express();
app
  .use(express.json())
  .use(cors())
  .get("/health", (req, res) => res.send("tudo certo"))
  .use(EmployeeRouter)
  .use(DepartmentRouter)
  .use(PositionRouter)
  .use(errorHandler);

app.listen(5000, () => {
  console.log("Projeto rodando na porta 5000. :)");
});
