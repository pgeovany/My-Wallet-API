import { getDataBase, closeDataBase } from "../databases/mongo.js";
import { singinSchema } from "../utils/schemas.js";
import getUserByEmail from "../utils/user/getUserByEmail.js";
import comparePasswords from "../utils/user/comparePasswords.js";
import STATUS from "../utils/statusCodes.js";

async function signInValidationMiddleware(req, res, next) {
  const { email, password } = req.body;

  try {
    await singinSchema.validateAsync({ email, password });
  } catch (error) {
    res
      .status(STATUS.UNPROCESSABLE_ENTITY)
      .send("Por favor, preencha os dados corretamente!");
    closeDataBase();
    return;
  }

  try {
    const db = await getDataBase();
    const user = await getUserByEmail(email, db);

    if (!user || !(await comparePasswords(password, user.password))) {
      res.status(STATUS.NOT_FOUND).send("Usuário ou senha incorretos!");
      closeDataBase();
      return;
    }

    req.locals = {
      userId: user._id,
      db,
    };

    next();
  } catch (error) {
    console.log(error);
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send("Erro ao fazer login, tente novamente mais tarde!");
    closeDataBase();
  }
}

export default signInValidationMiddleware;
