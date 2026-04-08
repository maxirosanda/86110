import { Router } from "express";
import { generateToken } from "../utils/jsonwebtoken.js";

const router = Router();
const users = [];

router.post("/register", (req, res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
    users.push({name,email,password});
    const token = generateToken({name,email});
    res.cookie("token", token, {httpOnly: true});
    res.status(201).json({status: "success", message: "User registered successfully", user:{name,email}});
});

router.post("/login", (req, res) => {
    const {email, password} = req.body
    const user = users.find(user => user.email === email && user.password === password)
    if(!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }
    const token = generateToken({name:user.name,email});
    res.cookie("token", token, {httpOnly: true});
    res.status(200).json({status: "success", message: "User logged in successfully", user});
});

router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.status(200).json({status: "success", message: "User logged out successfully"});
})

export default router;