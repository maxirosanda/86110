import { Router } from "express";
import { authUserApi, authAdminApi } from "../middlewares/authorization.js";
import { passportCallApi } from "../utils/passportCall.js";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/products.controller.js";


const router = Router()

router.get("/",passportCallApi("jwt"),authUserApi,getProducts)
router.post("/",createProduct)
router.delete("/",deleteProduct)
router.put("/",updateProduct)

export default router