import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import signUpValidationMiddleware from "../middlewares/signUpValidationMiddleware.js";
import signInValidationMiddleware from "../middlewares/signInValidationMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-in", signInValidationMiddleware, signIn);
authRouter.post("/sign-up", signUpValidationMiddleware, signUp);

export default authRouter;
