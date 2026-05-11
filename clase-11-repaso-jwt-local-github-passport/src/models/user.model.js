import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        default:""
    },
    password: {
        type:String,
        default:""
    },
    role: {
        type:String,
        default:"user"
    },
    githubId: {
        type:String,
        default:""
    },
    name: {
        type:String,
        default:""
    },
    age: {
        type:Number,
        default:0
    },
    resetPasswordCode: {
        type:String,
        default:""
    },
    resetPasswordCodeExpires: {
        type:Date,
        default:null
    }
});

export const User = mongoose.model("User", userSchema);