import { MongoConnect } from "../config/mongoConnect.config.js";
import dotenv from "dotenv"

dotenv.config()

export let productsDao

switch(process.env.PERSISTENCE){
    case "memory":
        console.log("memory")
        productsDao = await import("./memory/products.dao.js")
        break
    case "database":
        console.log("database")
        MongoConnect.getInstance()
        productsDao = await import("./database/products.dao.js")
        break
    default:
        console.log("default memory")
        productsDao = await import("./memory/products.dao.js")
}