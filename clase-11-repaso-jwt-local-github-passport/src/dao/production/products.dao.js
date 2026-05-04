import { Product } from "../../models/product.model.js";

const getAll = async () => {
    try {
        const products = await Product.find();
        return [null, products];
    } catch (error) {
        return [error, null];
    }

}

export { getAll }