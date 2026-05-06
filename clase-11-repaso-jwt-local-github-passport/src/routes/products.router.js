import { Router } from 'express';
import { getProducts } from '../controllers/products.controller.js';
import passport from 'passport';
import { authUser, authAdmin } from '../middlewares/auth.middleware.js';
import { createProduct } from '../controllers/products.controller.js';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false}),authUser, getProducts);
router.post('/', passport.authenticate('jwt', { session: false}),authAdmin, createProduct);


export default router;