import { getAllProductsService,
         createProductService,
         deleteProductService, 
         updateProductService 
} from "../services/products.service.js";
import { createProductDto,responseCreateProductDto } from "../dtos/products.dto.js";

 export const getProducts = async (req,res)=>{
        const [error,products] = await getAllProductsService()
        if(error) return res.status(500).json({message:error.message})
        return res.json({products})
}

export const createProduct = async (req,res)=>{

    const {title,description,price,stock,category} = req.body

    const product = createProductDto({title,price,description,stock,category})    
    const [error,productCreated] = await createProductService(product)

    if(error) return res.status(500).json({message:error})
    const productResponse = responseCreateProductDto(productCreated)
    res.json({message:"product created",productResponse})
        
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.body
    if(!id) return res.json({message:"id required"})

    const [error,productDeleted] = await deleteProductService(id)

    if(error) return res.status(500).json({message:error})
    res.json({message:"product deleted",productDeleted})
}

export const updateProduct = async (req,res)=>{
    const {id,data} = req.body
    if(!id) return res.json({message:"id required"})

    const [error,productUpdated] = await updateProductService(id,data)

    if(error) return res.status(500).json({message:error})
    res.json({message:"product updated",productUpdated})
}