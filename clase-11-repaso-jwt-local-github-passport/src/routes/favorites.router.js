import { Router } from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import { customPassport } from '../utils/customPassport.js';
import { addProductToFavorites } from '../controllers/favorites.controller.js';


const router = Router();

router.post('/add/:id', customPassport('jwt'), authUser, addProductToFavorites);

export default router;
