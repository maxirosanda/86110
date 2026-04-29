
export const createProductDto = ({title,price,description,stock,category}) =>{

    if(title == "") throw new Error("title required")
    if(price == "") throw new Error("price required")
    if(description == "") throw new Error("description required")
    if(stock == "") throw new Error("stock required")
    if(category == "") throw new Error("category required")

    let fullName = `${title} - ${category}`

    return {
        title,
        fullName,
        price,
        description,
        stock,
        category
    }
}

export const responseCreateProductDto = ({_id,title}) =>{
    return {
        _id,
        title   
    }
}