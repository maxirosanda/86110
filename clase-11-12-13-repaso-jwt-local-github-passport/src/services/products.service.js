import { productDao } from '../dao/products/index.js';

 const getAll = async () => {
    const [error, products] = await productDao.getAll();
    if (error) {
        return [error, null];
    }
    return [null, products];

}

 const create = async (product) => {
    const [error, productCreated] = await productDao.create(product);
    if (error) {
        return [error, null];
    }
    return [null, productCreated];
}

export const ProductsService = { getAll, create };
