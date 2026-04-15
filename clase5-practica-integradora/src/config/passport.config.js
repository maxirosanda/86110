import passport from "passport";
import local from "passport-local"
import userModel from "../models/userModel.js";
import { createHash, isValidPassword } from "../utils/hashing.utils.js";
import jwt,{ ExtractJwt } from "passport-jwt"

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy

const cookieExtractor = req => req && req.cookies ? req.cookies["coderPracticaIntegradora"] : null

 export const initializePassport = () => {

    passport.use("jwt",new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey:process.env.SECRET_JWT
        }
    ,async (jwt_payload,done)=>{
        try {
            return done(null,jwt_payload.user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use("register",new LocalStrategy(
    {
        passReqToCallback:true,
        usernameField:"email"
    },
    async (req, userName, password,done) =>{
        const {firstName, lastName, age} = req.body
        if(!firstName) return done(null,false,{message:"firstName required"})
        if(!lastName) return done(null,false,{message:"lastName required"})
        if(!age) return done(null,false,{message:"age required"})
        try {
            const userExist = await userModel.findOne({email:userName})
            if(userExist) return done(null,false,{message:"User already exist"})
            const newUser = { 
                email:userName,
                firstName,
                lastName,
                age,
                password: createHash(password)
            }
            await userModel.create(newUser) 
            const user = {  email:userName,
                            firstName,
                            lastName,
                            age,
                            role:"user"
            }
            return done(null,user)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use("login",new LocalStrategy(
        {
            usernameField:"email"
        },
        async (userName,password,done)=>{
            try {
                const userFinted = await userModel.findOne({email:userName})
                if(!userFinted) return done(null,false,{message:"User not exist"})  
                if(!isValidPassword(password,userFinted.password)) return done(null,false,{message:"password invalid"})
                const user = {
                    email:userName,
                    firstName:userFinted.firstName,
                    lastName:userFinted.lastName,
                    age:userFinted.age,
                    role:userFinted.role
                }
                return done(null,user)
            } catch (error) {
                return done(error)
            }
    }))
}