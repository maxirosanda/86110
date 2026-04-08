import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: "1h"});
}

export const authToken = (req, res, next) => {

    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
        if(err) {
            return res.status(403).json({message: "Forbidden"});
        }
        req.user = user;
        next();
    })
}