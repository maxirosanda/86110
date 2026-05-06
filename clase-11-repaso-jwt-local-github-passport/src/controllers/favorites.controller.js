import { createFavoriteDto } from "../dto/favorites/createFavorite.dto.js";
import * as favoritesService from "../services/favorites.service.js";

export const addProductToFavorites = async (req, res) => {

    const favoriteDto = createFavoriteDto({userId: req.user._id, productId: req.params.id});
    if(favoriteDto.errorDto){
        return res.status(400).json({ message: favoriteDto.errorDto });
    }
    const [error, favorite] = await favoritesService.addToFavorites(favoriteDto.favoriteDto);
    if(error){
        return res.status(500).json({ message: error.message });
    }
    res.json({ message: 'Product added to favorites successfully', favorite }); 
}