import productsModel from "../../models/products.model.js"


const getAll = async () => {
    const products = await productsModel.find({})
    return products
}

const create = async(title,price,description,stock,category)=>{
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
    return productCreated
}

const findByIdAndDelete = async (id) =>{
    const productExist = await productsModel.findOne({_id:id})
    if(!productExist) return ["product not found",null]
    
    const productDeleted = await productsModel.findByIdAndDelete(id)
    return productDeleted
}

const findByIdAndUpdate = async(id,data)=>{
    const productExist = await productsModel.findOne({_id:id})
    if(!productExist) return ["product not found",null]
    const productUpdated = await productsModel.findByIdAndUpdate(id,data,{new:true})
    return [null,productUpdated]
}

export {getAll, create, findByIdAndDelete, findByIdAndUpdate}