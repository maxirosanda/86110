
const getProducts = async () =>{
    const response = await fetch("http://localhost:8080/api/products")
    const data = await response.json()
    console.log(data)
}

const createProduct = async () =>{
    const response = await fetch("http://localhost:8080/api/products",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: "Product 1",
            description: "Description 1",
            price: 10,
            code: "123",
            stock: 10
        })
    })
    const data = await response.json()
    return data
}

getProducts()

const form = document.getElementById("createProductForm")

form.addEventListener("submit",async (e)=>{
    e.preventDefault()
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const price = document.getElementById("price").value
    const category = document.getElementById("category").value
    const stock = document.getElementById("stock").value
    const data = {
        title,
        description,
        price,
        category,
        stock
    }
    const dataCreated = await createProduct(data)
    if(dataCreated){
        console.log("Producto creado exitosamente")
        form.reset()
    }
})