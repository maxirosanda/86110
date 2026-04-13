import { Router } from "express";
import productsModel from "../models/products.model.js";
import { authUser } from "../middlewares/authorization.js";

const router = Router()

router.get("/",authUser,async (req,res)=>{
    try {
        const products = await productsModel.find().lean()
        res.render("index",{products})
    } catch (error) {
        
    }
})

export default router