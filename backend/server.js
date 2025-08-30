import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url"
import path from "path";
import morgan from "morgan";
import cors from "cors";

dotenv.config("./.env");
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

import userRouter from "./routers/user.js";
app.use("/api/v1/users", userRouter);

app.get('/api/v1', (req, res) => {
    console.log("Working from express");
    res.status(200).json({ message: "Default route working" });
})

app.get(/.*/, (req, res) => {
    console.log("Working from catch-all");
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, (req, res) => {
    console.log(`Server listening at http://localhost:${PORT}`);
})