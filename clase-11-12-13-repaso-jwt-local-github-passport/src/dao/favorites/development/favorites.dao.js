
import { Favorites } from "../../../models/favorites.js";

const addProduct = async (favorite) => {
    try {
        const favoriteExist = await Favorites.findOne({ userId: favorite.userId});
        if (!favoriteExist) {
            const favoriteCreated = await Favorites.create({ userId: favorite.userId, products: [favorite.productId]});
            return [null, favoriteCreated];
        }

        if (favoriteExist.products.includes(favorite.productId)) {
                return [Error('Product already exists in favorites'), null];
        }
        const favoriteCreated = await Favorites.updateOne({_id: favoriteExist._id}, {$push: {products: favorite.productId}}).lean();
        return [null, favoriteCreated];
    } catch (error) {
        return [error, null];
    }
}

const getAll = async (userId) => {
    try {
        const favorites = await Favorites.find({ userId }).populate('products').lean();
        return [null, favorites];
    } catch (error) {
        return [error, null];
    }
}

export { addProduct, getAll } 