import Router from "./router.js";
import { authMiddleware } from "../middlewares/auth.js";

export default class ProductsRouter extends Router{
    init(){
        this.get("/",["ADMIN"],authMiddleware,(req,res)=>{
            res.success([])
        })

        this.get("/current-products",["ADMIN","USER"],authMiddleware,(req,res)=>{
            res.success([])
        })

    }
}