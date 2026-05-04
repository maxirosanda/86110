import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
});

export const Product = mongoose.model("Product", productSchema);