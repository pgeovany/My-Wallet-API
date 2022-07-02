import { getDataBase, closeDataBase } from "../databases/mongo.js";
import { transactionSchema } from "../utils/schemas.js";
import STATUS from "../utils/statusCodes.js";
import getUserById from "../utils/getUserById.js";
import getSession from "../utils/user/getSession.js";

async function addTransactionValidationMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const transaction = req.body;
  transaction.value = parseFloat(transaction.value);

  try {
    await transactionSchema.validateAsync(transaction);
  } catch (error) {
    res.sendStatus(STATUS.UNPROCESSABLE_ENTITY);
    return;
  }

  if (!token) {
    res.sendStatus(STATUS.UNAUTHORIZED);
    return;
  }

  try {
    const db = await getDataBase();
    const session = await getSession(token, db);

    if (!session) {
      res.sendStatus(STATUS.UNAUTHORIZED);
      closeDataBase();
      return;
    }

    const user = await getUserById(session.userId, db);

    if (!user) {
      res.sendStatus(STATUS.UNAUTHORIZED);
      closeDataBase();
      return;
    }

    req.locals = {
      userId: user._id,
      transaction,
      db,
    };

    next();
  } catch (error) {
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send("Erro ao realizar transação, tente novamente mais tarde!");
    closeDataBase();
  }
}

export default addTransactionValidationMiddleware;
