import { closeDataBase } from "../databases/mongo.js";
import createAccount from "../utils/user/createAccount.js";
import saveSession from "../utils/user/saveSession.js";
import STATUS from "../utils/statusCodes.js";

async function signUp(req, res) {
  const { user, db } = res.locals;

  try {
    await createAccount(user, db);
    res.sendStatus(STATUS.CREATED);
    closeDataBase();
  } catch (error) {
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send("Erro ao cadastrar o usuário!");
    closeDataBase();
  }
}

async function signIn(req, res) {
  const { userId, db } = req.locals;

  try {
    const token = await saveSession(userId, db);
    res.status(STATUS.OK).send(token);
    closeDataBase();
  } catch (error) {
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send("Erro ao fazer login, tente novamente mais tarde!");
    closeDataBase();
  }
}

export { signIn, signUp };
