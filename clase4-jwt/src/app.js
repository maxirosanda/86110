import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router.js";
import { authToken } from "./utils/jsonwebtoken.js";
import cookieParser from "cookie-parser";
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from 'path';
import viewsRouter from "./routes/views.router.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use("/api/auth", authRouter);
app.use("/", viewsRouter);

app.get("/current", authToken, (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});