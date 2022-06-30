import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { signIn, signUp } from "./controllers/authController.js";

dotenv.config();

const { PORT } = process.env;

const app = express();
app.use([cors(), json()]);

app.post("/sign-in", signIn);
app.post("/sign-up", signUp);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
