import { createFavoriteDto } from "../dto/favorites/createFavorite.dto.js";
import { favoritesService } from "../services/favorites.service.js";

export const addProductToFavorites = async (req, res) => {
    const { errorDto, favoriteDto } = createFavoriteDto({userId: req.user._id, productId: req.params.id});
    if(errorDto){
        return res.status(400).json({ message: errorDto });
    }
    const [error, favorite] = await favoritesService.addToFavorites(favoriteDto);
    if(error){
        return res.status(500).json({ message: error.message });
    }
    res.json({ message: 'Product added to favorites successfully', favorite }); 
}

export const getAllFavorites = async (req, res) => {
    const [error, favorites] = await favoritesService.getAll(req.user._id);
    if(error){
        return res.status(500).json({ message: error.message });
    }
    res.json(favorites);
}