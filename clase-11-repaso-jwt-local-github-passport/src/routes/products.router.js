import { Router } from 'express';
import { getProducts } from '../controllers/products.controller.js';
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false}), getProducts);

export default router;