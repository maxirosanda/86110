import { productsDao } from "../daos/index.js"

export const getAllProductsService = async () => {
    try {
        const products = await productsDao.getAll() 
        return [null,products]
    } catch (error) {
        return [error,null]
    }
} 

export const createProductService = async ({title,price,description,stock,category}) => {
    try {

        const productCreated = await productsDao.create(title,price,description,stock,category)
        return [null,productCreated]
    } catch (error) {
        return [error,null] 
    }
}

export const deleteProductService = async (id) => {
    try {
        const productDeleted = await productsDao.findByIdAndDelete(id)
        return [null,productDeleted]
    } catch (error) {
        return [error,null]
    }
}

export const updateProductService = async (id,data) => {
    try {
        const productUpdated = await productsDao.findByIdAndUpdate(id,data)
        return [null,productUpdated]
    } catch (error) {
        return [error,null]
    }
}