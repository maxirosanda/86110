import { Router } from "express";
import jwt from "jsonwebtoken";

export default class CustomRouter {
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        throw new Error("init() method must be implemented")
    }

    getRouter(){
        return this.router;
    }
    get(path,policies ,...callbacks){
        this.router.get(path,this.handlePolicie(policies),this.generateCustomResponse,this.applyCallbacks(callbacks))
    }
    post(path,policies ,...callbacks){
        this.router.post(path,this.handlePolicie(policies),this.generateCustomResponse,this.applyCallbacks(callbacks))
    }
    put(path,policies ,...callbacks){
        this.router.put(path,this.handlePolicie(policies),this.generateCustomResponse,this.applyCallbacks(callbacks))
    }
    delete(path,policies ,...callbacks){
        this.router.delete(path,this.handlePolicie(policies),this.generateCustomResponse,this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback => async (req,res,next)=>{
            try {
                await callback.apply(this,[req,res,next])
            } catch (error) {
                next(error)
            }
        })
    }

    generateCustomResponse(req,res,next){
        res.success = (data) => res.json({status:"success",payload:data})
        res.serverError = (error) => res.status(500).json({status:"error",error:error.message})
        res.clientError = (error) => res.status(400).json({status:"error",error:error.message})
        next()
    }

    handlePolicie(policies){
        return (req,res,next)=>{

            if(policies.includes("PUBLIC")){
                return next()
            }

            const authHeaders = req.headers.authorization;
            if(!authHeaders){
                return res.clientError("Unauthorized")
            }
            const token = authHeaders.split(" ")[1]; // "Bearer djsafhlfjskdlfjsdflkjsdfl"
            const user = jwt.verify(token,"secret");
            if(!user){
                return res.json({status:"error",error:"Unauthorized"})
            }

            if(policies.includes(user.role)){
                return next()
            }

            return res.json({status:"error",error:"Unauthorized"})

        }
    }

}