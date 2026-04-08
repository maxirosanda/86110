import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routes/produtsRouter.js";
import sessionRouter from "./routes/sessionRouter.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
app.use(session({
    store:MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 60 * 60 * 24
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

initializePassport()
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productsRouter);
app.use("/api/session", sessionRouter);

mongoose.connect(process.env.MONGO_URL)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});