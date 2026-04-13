import express from "express"
import dotenv from "dotenv"
import productsRouter from "./routes/products.router.js"
import mongoose from "mongoose"
import { engine } from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
import path from 'path';
import { fileURLToPath } from 'url';
import {initializePassport} from "./config/passport.config.js";
import passport from "passport"
import userRouter from "./routes/user.router.js"

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app.use(express.json())

// Registrar el motor de vistas
app.engine('hbs', engine({
  extname: '.hbs',              // extensión de los archivos
  defaultLayout: 'main',        // layout por defecto
  layoutsDir: path.join(__dirname, 'views/layouts/'), // carpeta de layouts
  partialsDir: path.join(__dirname, 'views/partials/')  // carpeta de partials (opcional)
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));
initializePassport()
app.use(passport.initialize())

app.use("/api/products",productsRouter)
app.use("/api/users",userRouter)
app.use("/",viewsRouter)

mongoose.connect(process.env.MONGO_URL)
app.listen(process.env.PORT,()=> console.log('server in port: ' + process.env.PORT ))
