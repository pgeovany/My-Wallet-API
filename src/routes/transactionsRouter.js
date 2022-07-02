import { Router } from "express";
import addTransaction from "../controllers/transactionsController.js";
import addTransactionValidationMiddleware from "../middlewares/addTransactionValidationMiddleware.js";

const transactionsRouter = Router();

transactionsRouter.post(
  "/add-transaction",
  addTransactionValidationMiddleware,
  addTransaction
);

export default transactionsRouter;
