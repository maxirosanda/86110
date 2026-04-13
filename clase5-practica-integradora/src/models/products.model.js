import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title:String,
    prince:Number,
    stock:Number,
    category:String,
    description:String
})

export default mongoose.model("product",productSchema)