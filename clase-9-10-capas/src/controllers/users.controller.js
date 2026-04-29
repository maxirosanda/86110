import { generateToken } from "../utils/generateToken.js";
import { createUserDto } from "../dtos/users.dto.js";


export const register = async (req, res) =>{
    try {
        const user = createUserDto(req.body)
        if(!req.user) return res.status(400).json({message:"Registration failed"})
        const token = generateToken(req.user)
        res.cookie("coderPracticaIntegradora",token,{httpOnly:true,secure:false}).json({message:"user register and loger"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export const login = async (req,res) => {
    try {
        if(!req.user) return res.status(400).json({message:"Registration failed"})
        const token = generateToken(req.user)
        res.cookie("coderPracticaIntegradora",token,{httpOnly:true,secure:false}).json({message:"user loger"})
    } catch (error) {
        res.status(500).json(error)
    }
}

export const logout = (req,res)=>{
    res.clearCookie('coderPracticaIntegradora').json({ message: "ok Logout" })
}