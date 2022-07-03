import { closeDataBase } from "../databases/mongo.js";
import STATUS from "../utils/statusCodes.js";
import updateUserBalance from "../utils/user/updateUserBalance.js";
import getUserTransactions from "../utils/transactions/getUserTransactions.js";
import saveTransaction from "../utils/transactions/saveTransaction.js";

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
      .send("Erro ao realizar transação, tente novamente mais tarde!");
    closeDataBase();
  }
}

async function getTransactions(req, res) {
  const { name, userId, balance, db } = req.locals;

  try {
    const transactions = await getUserTransactions(userId, db);
    res
      .status(STATUS.OK)
      .send({ name, balance, transactions: transactions.reverse() });
  } catch (error) {
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .send(
        "Erro ao carregar a lista de transações, tente novamente mais tarde!"
      );
    closeDataBase();
  }
}

export { addTransaction, getTransactions };
