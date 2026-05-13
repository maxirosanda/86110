import { Router } from 'express';
import { getProducts } from '../controllers/products.controller.js';
import { authUser, authAdmin } from '../middlewares/auth.middleware.js';
import { createProduct } from '../controllers/products.controller.js';
import { customPassport } from '../utils/customPassport.js';

const router = Router();

router.get('/', customPassport('jwt'), authUser, getProducts);
router.post('/', customPassport('jwt'),authAdmin, createProduct);


export default router;