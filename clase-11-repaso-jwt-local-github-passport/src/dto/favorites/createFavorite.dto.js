
export const createFavoriteDto = (data) => {
    
    if(!data.userId){
        return {
            errorDto: "User ID is required",
            favoriteDto: null
        }
    }
    if(!data.productId){
        return {
            errorDto: "Product ID is required",
            favoriteDto: null
        }
    }
    return {
        errorDto: null,
        favoriteDto: {
            userId: data.userId,
            productId: data.productId
        }
    }


}