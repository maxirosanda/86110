import { Product } from "../../../models/product.model.js";

const getAll = async () => {
    try {
        const products = await Product.find().lean();
        return [null, products];
    } catch (error) {
        return [error, null];
    }

}

const create = async (product) => {
    try {
        const productExist = await Product.findOne({ title: product.title });
        if (productExist) {
            return [Error('Product already exists'), null];
        }
        const productCreated = await Product.create(product);
        return [null, productCreated];
    } catch (error) {
        return [error, null];
    }
}

export { getAll, create }