// patron Factory
import "../../config/dotenv.config.js";

export let favoriteDao;

switch (process.env.PERSISTENCE) {
    case 'production':
        favoriteDao = await import('./production/favorites.dao.js');
        break;
    case 'development':
        favoriteDao = await import('./development/favorites.dao.js');
        break;
    default:
        favoriteDao = await import('./development/favorites.dao.js');
        break;
}
