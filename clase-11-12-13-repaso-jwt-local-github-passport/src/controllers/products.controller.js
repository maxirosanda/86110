import { createProductDto } from '../dto/products/createProduct.dto.js';
import { ProductsService } from '../services/products.service.js';

export const getProducts = async (req, res) => {
    const [error, products] = await ProductsService.getAll();
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json(products);
}

export const createProduct = async (req, res) => {

    const { productDto, errorDto } = createProductDto(req.body);


    if (errorDto) {
        return res.status(400).json({ errorDto });
    }

    const [error, product] = await ProductsService.create(productDto);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Product created successfully', product });
}
