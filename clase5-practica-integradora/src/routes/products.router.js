import { Router } from "express";
import productsModel from "../models/products.model.js";
import { authUserApi, authAdminApi } from "../middlewares/authorization.js";
import { passportCallApi } from "../utils/passportCall.js";


const router = Router()

router.get("/",passportCallApi("jwt"),authUserApi,async (req,res)=>{
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
        res.json({message:"product created",productCreated})
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/",async (req,res)=>{
    const {id} = req.body
    try {
        if(!id) return res.json({message:"id required"})
        const productDeleted = await productsModel.findByIdAndDelete(id)
        res.json({message:"product deleted",productDeleted})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/",async (req,res)=>{
    const {id,data} = req.body
    console.log(id,data)
    try {
        if(!id) return res.json({message:"id required"})
        const productUpdated = await productsModel.findByIdAndUpdate(id,data,{new:true})
        res.json({message:"product updated",productUpdated})
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router