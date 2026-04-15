import { Router } from "express";
import { generateToken } from "../utils/generateToken.js";
import { passportCall } from "../utils/passportCall.js";

const router = Router()

router.post("/register",passportCall("register"),async (req, res) =>{
    try {
        if(!req.user) return res.status(400).json({message:"Registration failed"})
        const token = generateToken(req.user)
        res.cookie("coderPracticaIntegradora",token,{httpOnly:true,secure:false}).json({message:"user register and loger"})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login",passportCall("login"),async (req,res) => {
    try {
        if(!req.user) return res.status(400).json({message:"Registration failed"})
        const token = generateToken(req.user)
        res.cookie("coderPracticaIntegradora",token,{httpOnly:true,secure:false}).json({message:"user loger"})
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/logout",(req,res)=>{
    res.clearCookie('coderPracticaIntegradora').json({ message: "ok Logout" })
})



export default router