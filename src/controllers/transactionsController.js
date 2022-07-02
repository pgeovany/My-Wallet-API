import { closeDataBase } from "../databases/mongo.js";
import STATUS from "../utils/statusCodes.js";
import saveTransaction from "../utils/transactions/saveTransaction.js";
import updateUserBalance from "../utils/user/updateUserBalance.js";

async function addTransaction(req, res) {
  const { userId, transaction, db } = req.locals;

  try {
    await saveTransaction(userId, transaction, db);
    await updateUserBalance(userId, transaction, db);

    res.sendStatus(STATUS.CREATED);
    closeDataBase();
  } catch (error) {
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send("Erro ao realizar transação!");
    closeDataBase();
  }
}

export default addTransaction;
