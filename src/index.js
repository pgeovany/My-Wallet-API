import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { getDataBase, closeDataBase } from "./utils/dataBase.js";
import getUserByEmail from "./utils/user/getUserByEmail.js";
import createAccount from "./utils/user/createAccount.js";
import singupSchema from "./utils/schemas.js";

dotenv.config();

const { PORT } = process.env;
const CREATED = 201;
const CONFLICT = 409;
const UNPROCESSABLE_ENTITY = 422;
const INTERNAL_SERVER_ERROR = 500;

const app = express();
app.use([cors(), json()]);

app.post("/sign-up", async (req, res) => {
  const user = req.body;

  try {
    await singupSchema.validateAsync(user);
  } catch (error) {
    res
      .status(UNPROCESSABLE_ENTITY)
      .send("Por favor, preencha os dados corretamente!");
    closeDataBase();
    return;
  }

  try {
    const db = await getDataBase();
    const userExists = await getUserByEmail(user.email, db);
    if (userExists) {
      res.status(CONFLICT).send("Esse email já está cadastrado!");
      closeDataBase();
      return;
    }

    await createAccount(user, db);
    res.sendStatus(CREATED);
    closeDataBase();
    return;
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Erro ao cadastrar o usuário!");
    closeDataBase();
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
