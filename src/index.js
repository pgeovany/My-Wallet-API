import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { getDataBase, closeDataBase } from "./utils/dataBase.js";
import { singupSchema, singinSchema } from "./utils/schemas.js";
import getUserByEmail from "./utils/user/getUserByEmail.js";
import createAccount from "./utils/user/createAccount.js";
import comparePasswords from "./utils/user/comparePasswords.js";
import saveSession from "./utils/user/saveSession.js";

dotenv.config();

const { PORT } = process.env;
const OK = 200;
const CREATED = 201;
const NOT_FOUND = 404;
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
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).send("Erro ao cadastrar o usuário!");
    closeDataBase();
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    await singinSchema.validateAsync({ email, password });
  } catch (error) {
    res
      .status(UNPROCESSABLE_ENTITY)
      .send("Por favor, preencha os dados corretamente!");
    closeDataBase();
    return;
  }

  try {
    const db = await getDataBase();
    const user = await getUserByEmail(email, db);

    if (!user || !(await comparePasswords(password, user.password))) {
      res.status(NOT_FOUND).send("Usuário ou senha incorretos!");
      closeDataBase();
      return;
    }

    const token = await saveSession(user._id, db);
    res.status(OK).send(token);
    closeDataBase();
  } catch (error) {
    console.log(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send("Erro ao fazer login, tente novamente mais tarde!");
    closeDataBase();
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
