
export const createProductDto = (data) => {
    if(!data.title){
        return {
            errorDto: "Title is required",
            productDto : null
        }
    }
    if(!data.price){
        return {
            errorDto: "Price is required",
            productDto : null
        }
    }
    if(!data.stock){
        return {
            errorDto: "Stock is required",
            productDto : null
        }
    }
    return {
        errorDto: null,
        productDto:{
            title: data.title,
            price: data.price,
            stock: data.stock
        },
    }
}