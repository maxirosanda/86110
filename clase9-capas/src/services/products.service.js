import productsModel from "../models/products.model.js";

export const getAllProductsService = async () => {
    try {
        const products = await productsModel.find({}) 
        return [null,products]
    } catch (error) {
        return [error,null]
    }
} 

export const createProductService = async ({title,price,description,stock,category}) => {
    try {
        const productExist = await productsModel.findOne({title})
        if(productExist) return ["product exist",null]

        const product = {
            title,
            price,
            description,
            stock,
            category
        }
        const productCreated = await productsModel.create(product)
        return [null,productCreated]
    } catch (error) {
        return [error,null] 
    }
}

export const deleteProductService = async (id) => {
    try {
        const productDeleted = await productsModel.findByIdAndDelete(id)
        return [null,productDeleted]
    } catch (error) {
        return [error,null]
    }
}

export const updateProductService = async (id,data) => {
    try {
        const productUpdated = await productsModel.findByIdAndUpdate(id,data,{new:true})
        return [null,productUpdated]
    } catch (error) {
        return [error,null]
    }
}