import express from "express";
import cookieParser from "cookie-parser";
import productsRouter from "./routes/products.router.js";
import usersRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";
import favoritesRouter from "./routes/favorites.router.js";
import "./config/dotenv.config.js";
import passport from "passport";
import "./config/passport.config.js";
import { connectMongo } from "./config/mongoConnect.config.js";
import { engine } from 'express-handlebars';
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser({ secrets: [process.env.COOKIE_SECRET] }));

app.use(passport.initialize());


app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/favorites', favoritesRouter);
app.use("/", viewsRouter);

 await connectMongo();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});