import * as productService from '../services/product.service.js';

export const getProducts = async (req, res) => {
    const [error, products] = await productService.getAll();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(products);
}