
import { Favorites } from "../../../models/favorites.js";

const addProduct = async (favorite) => {
    try {
        const favoriteCreated = await Favorites.create(favorite);
        return [null, favoriteCreated];
    } catch (error) {
        return [error, null];
    }
}

export { addProduct } 