import { Router } from "express";
import addTransactionValidationMiddleware from "../middlewares/addTransactionValidationMiddleware.js";
import getTransactionsValidationMiddleware from "../middlewares/getTransactionsValidationMiddleware.js";
import {
  getTransactions,
  addTransaction,
} from "../controllers/transactionsController.js";

const transactionsRouter = Router();

transactionsRouter.post(
  "/transactions",
  addTransactionValidationMiddleware,
  addTransaction
);

transactionsRouter.get(
  "/transactions",
  getTransactionsValidationMiddleware,
  getTransactions
);

export default transactionsRouter;
