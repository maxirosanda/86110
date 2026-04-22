import express from "express";
import ProductsRouter from "./routes/products.router.js";
import UsersRouter from "./routes/users.router.js";

const app = express();

const productsRouter = new ProductsRouter();
const usersRouter = new UsersRouter();

app.get("/:word",(req,res)=>{

    const {word} = req.params;

    if(!/^[\p{L}]+$/u.test(word)){
        return res.status(400).send("Invalid word")
    }

    return res.send(`${word}`)
})

app.use("/api/products",productsRouter.getRouter())
app.use("/api/users",usersRouter.getRouter())

app.listen(8080,()=>{
    console.log("Server in port: 8080")
})