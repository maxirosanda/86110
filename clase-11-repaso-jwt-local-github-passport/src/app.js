import express from "express";
import cookieParser from "cookie-parser";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import "./config/dotenv.config.js";
import passport from "passport";
import "./config/passport.config.js";
import { connectMongo } from "./config/mongoConnect.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser({ secrets: [process.env.COOKIE_SECRET] }));

app.use(passport.initialize());


app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

 await connectMongo();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});