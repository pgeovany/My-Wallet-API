import { getDataBase, closeDataBase } from "../databases/mongo.js";
import STATUS from "../utils/statusCodes.js";
import getSession from "../utils/user/getSession.js";
import getUserById from "../utils/user/getUserById.js";

async function getTransactionsValidationMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

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
      name: user.name,
      userId: user._id,
      balance: user.balance,
      db,
    };

    next();
  } catch (error) {
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send(
        "Erro ao carregar a lista de transações, tente novamente mais tarde!"
      );
    closeDataBase();
  }
}
export default getTransactionsValidationMiddleware;
