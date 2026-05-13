import { favoriteDao } from "../dao/favorites/index.js";

 const addToFavorites = async (favoriteDto) => {
    try {
        const [error, favoriteCreated] = await favoriteDao.addProduct(favoriteDto);
        if (error) {
            return [error, null];
        } 
        return [null, favoriteCreated];
    } catch (error) {
        return [error, null];
    }
}

const getAll = async (userId) => {
    try {
        const [error, favorites] = await favoriteDao.getAll(userId);
        if (error) {
            return [error, null];
        }
        return [null, favorites];
    } catch (error) {
        return [error, null];
    }
}

export const favoritesService = { addToFavorites, getAll };
