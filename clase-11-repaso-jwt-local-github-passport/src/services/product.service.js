import { productDao } from '../dao/products/index.js';

export const getAll = async () => {
    const [error, products] = await productDao.getAll();
    if (error) {
        return [error, null];
    }
    return [null, products];

}

export const create = async (product) => {
    const [error, productCreated] = await productDao.create(product);
    if (error) {
        return [error, null];
    }
    return [null, productCreated];
}