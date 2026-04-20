import Router from "./router.js";
import jwt from "jsonwebtoken";

export default class UsersRouter extends Router{
    init(){

        this.post("/login",["PUBLIC"],(req,res)=>{
            const token = jwt.sign({user:"Maxi",role:"ADMIN"},"secret",{expiresIn:"1h"})
            res.success({token:token})
        })


    }
}