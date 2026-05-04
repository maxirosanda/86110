import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from "../models/user.model.js";
import { createHash, isValidPassword} from "../utils/bcript.util.js";

const cookieExtractor = (req) => {
    return req && req.cookies ? req.cookies.jwt : null;
}


passport.use("jwt", new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
        try {
            const user = await User.findOne({email:jwt_payload.email});
            if (!user) {
                return done(null, false, {message: 'User not found'});
            }
            return done(null, {email:user.email, name:user.name, role:user.role});
        } catch (error) {
            return done(error, false);
        }
    }
))


passport.use("register", new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, username, password, done) => {
        const { name, age } = req.body;
        try {
            const user = await User.findOne({email:username});
            if (user) {
                return done(null, false, {message: 'User already exists'});
            }
            const hashedPassword = await createHash(password);
            const newUser = await User.create({
                email:username, 
                password:hashedPassword, 
                name, 
                age,
                role:"user"
            });
            return done(null, {email:newUser.email, name:newUser.name, role:newUser.role});
            
        } catch (error) {
            return done(error);
        }
    }
))




passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try {
            const user = await User.findOne({email:username});
            if (!user) {
                return done(null, false, {message: 'User not found'});
            }
            const isPasswordValid = await isValidPassword(password, user.password);
            if (!isPasswordValid) {
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, {email:user.email, name:user.name, role:user.role});
        } catch (error) {
            return done(error);
        }
    }
))