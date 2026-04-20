import { Router } from "express";
import productsModel from "../models/products.model.js";
import { authUser,authAdmin,authPublic } from "../middlewares/authorization.js";
import { passportCall,passportCallPublic } from "../utils/passportCall.js";

const router = Router()

router.get("/",passportCall("jwt"),authUser,async (req,res)=>{
    try {
        const products = await productsModel.find().lean()
        res.render("index",{products,navbar:true})
    } catch (error) {
        
    }
})

router.get("/register",passportCallPublic("jwt"),authPublic,(req,res)=>{
    return res.render("register",{navbar:false}) 
})

router.get("/login",passportCallPublic("jwt"),authPublic,(req,res)=>{
    return res.render("login",{navbar:false}) 

})

router.get("/create-product",passportCall("jwt"),authAdmin,async (req,res)=>{
    const products = await productsModel.find().lean()
    return res.render("create-product",{products,navbar:true}) 
})

export default router