import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const { PORT } = process.env;

const app = express();
app.use([cors(), json()]);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
