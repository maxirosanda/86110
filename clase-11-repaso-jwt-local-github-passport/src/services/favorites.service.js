import { favoriteDao } from "../dao/favorites/index.js";

export const addToFavorites = async (favoriteDto) => {
    try {
        console.log(favoriteDto);
        const [error, favoriteCreated] = await favoriteDao.addProduct(favoriteDto);
        if (error) {
            return [error, null];
        }
        return [null, favoriteCreated];
    } catch (error) {
        return [error, null];
    }
}