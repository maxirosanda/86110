import mongoose from "mongoose";

export class MongoConnect {

    static #instance = null

    constructor(){
        mongoose.connect(process.env.MONGO_URL)
    }

    static getInstance(){
        if(this.#instance) {return console.log("Already connected")}
        this.#instance = new MongoConnect()
        return console.log("connected")
    }
}