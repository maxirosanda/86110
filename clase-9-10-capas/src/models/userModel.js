import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
     lastName:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
    },
     age:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
    
})

export default mongoose.model("user",userSchema)