import express from "express";
import cors from "cors";

import { validateEmployeeId, validateRequest, validateRequestUpdate } from "./middleware.js";
import { deleteOne, get, post, put } from "./controllers.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => res.send("tudo certo"));

app.get("/employee", get);
app.post("/employee", validateRequest, post);
app.put("/employee/:id", validateEmployeeId, validateRequestUpdate, put);
app.delete("/employee/:id", validateEmployeeId, deleteOne);

app.listen(5000, () => {
  console.log("Projeto rodando na porta 5000. :)");
});
