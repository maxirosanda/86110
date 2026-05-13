import { Router } from "express";
import { ProductsService } from "../services/products.service.js";
import { favoritesService } from "../services/favorites.service.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { customPassport } from "../utils/customPassport.js";

const router = Router();

router.get("/", async (req, res) => {
    const [error, products] = await ProductsService.getAll();

    if (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

    res.render("home", { products });
});

router.get("/favorites", customPassport('jwt'), authUser, async (req, res) => {

    const [error, favorites] = await favoritesService.getAll(req.user._id);
    console.log(favorites[0].products);
    if (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
    res.render("favorites", { products: favorites[0].products });
});

router.get("/reset-password/:code", (req, res) => {
    const { code } = req.params;
    res.render("reset-password", {
        code,
    });
});

export default router;
