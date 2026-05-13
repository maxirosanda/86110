import { Router } from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import { customPassport } from '../utils/customPassport.js';
import { addProductToFavorites, getAllFavorites } from '../controllers/favorites.controller.js';


const router = Router();

router.get('/', customPassport('jwt'), authUser, getAllFavorites);
router.post('/:id', customPassport('jwt'), authUser, addProductToFavorites);

export default router;
