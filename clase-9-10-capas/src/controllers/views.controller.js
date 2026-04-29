import productsModel from "../models/products.model.js";


export const homeView = async (req,res)=>{
    try {
        const products = await productsModel.find().lean()
        res.render("index",{products,navbar:true})
    } catch (error) {
        
    }
}

export const registerView = (req,res)=>{
    return res.render("register",{navbar:false}) 
}

export const loginView = (req,res)=>{
    return res.render("login",{navbar:false}) 

}

export const createProductView = async (req,res)=>{
    const products = await productsModel.find().lean()
    return res.render("create-product",{products,navbar:true}) 
}

export const notFoundView = (req,res)=>{
    return res.render("not-found")
}
