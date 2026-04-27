import { getAllProductsService,
         createProductService,
         deleteProductService, 
         updateProductService 
} from "../services/products.service.js";

 export const getProducts = async (req,res)=>{
        const [error,products] = await getAllProductsService()
        if(error) return res.status(500).json({message:error})
        return res.json({products})
}

export const createProduct = async (req,res)=>{

    const {title,description,price,stock,category} = req.body

    if(!title) return res.json({message:"title required"})
    if(!description) return res.json({message:"description required"})
    if(!price) return res.json({message:"price required"})
    if(!stock) return res.json({message:"stock required"})
    if(!category) return res.json({message:"category required"})

    const [error,productCreated] = await createProductService({title,price,description,stock,category})

    if(error) return res.status(500).json({message:error})
    res.json({message:"product created",productCreated})
        
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