let products = []

const getAll = async () => {
    return products
}

const create = async(title,price,description,stock,category)=>{
    const productExist = products.find((p) => p.title === title)
    if(productExist) return ["product exist",null]

    const product = {
        id: products.length + 1,
        title,
        price,
        description,
        stock,
        category
    }

    products.push(product)
    return product
}

const findByIdAndDelete = async (id) =>{
    const idNumber = Number(id)
    const productExist = products.find((p) => p.id === idNumber)
    if(!productExist) return ["product not found",null]

    products = products.filter((p) => p.id !== idNumber)
    return [null,productExist]
}

const findByIdAndUpdate = async(id,data)=>{
    const productExist = products.find((p) => p.id === id)
    if(!productExist) return ["product not found",null]

    if(data.title) productExist.title = data.title
    if(data.price) productExist.price = data.price
    if(data.description) productExist.description = data.description
    if(data.stock) productExist.stock = data.stock
    if(data.category) productExist.category = data.category
    
    return [null,productExist]
}

export {getAll, create, findByIdAndDelete, findByIdAndUpdate}
