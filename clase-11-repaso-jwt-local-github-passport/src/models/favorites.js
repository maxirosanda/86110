import mongoose, { Schema } from "mongoose";

const favoritesSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
}, { timestamps: true });

export const Favorites = mongoose.model("Favorites", favoritesSchema);
