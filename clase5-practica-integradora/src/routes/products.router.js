import { Router } from "express";
import productsModel from "../models/products.model.js";
import { authUser } from "../middlewares/authorization.js";
import { passportCall } from "../utils/passportCall.js";

const router = Router()

router.get("/",passportCall("jwt"),authUser,async (req,res)=>{
    try {
        const products = await productsModel.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({error})
    }

})

router.post("/",async (req,res)=>{
    const {title,description,price,stock,category} = req.body
    try {

        if(!title) return res.json({message:"title required"})
        if(!description) return res.json({message:"description required"})
        if(!price) return res.json({message:"price required"})
        if(!stock) return res.json({message:"stock required"})
        if(!category) return res.json({message:"category required"})

        const productExist = await productsModel.findOne({title})
        if(productExist) return res.json({message:"product exist"})

        const product = {
            title,
            price,
            description,
            stock,
            category
        }
        const productCreated = await productsModel.create(product)
        res.json(productCreated)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router