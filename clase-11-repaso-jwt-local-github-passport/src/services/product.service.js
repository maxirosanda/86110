import {productDao} from '../dao/index.js';

export const getAll = async () => {
    const [error, products] = await productDao.getAll();
    if (error) {
        return [error, null];
    }
    return [null, products];

}