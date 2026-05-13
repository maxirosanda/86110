// patron Factory
import "../../config/dotenv.config.js";

export let productDao;

switch (process.env.PERSISTENCE) {
    case 'production':
        productDao = await import('./production/products.dao.js');
        break;
    case 'development':
        productDao = await import('./development/products.dao.js');
        break;
    default:
        productDao = await import('./development/products.dao.js');
        break;
}
