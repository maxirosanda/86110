import passport from "passport";
import userModel from "../models/user.model.js"
import GitHubStrategy from "passport-github2"

const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },async (_,__dirname,profile,done) => {
        try {
            const user = await userModel.findOne({id_github: profile._json.id})
            if(user) done(null,user)
            const newUser ={
                first_name: profile._json.name,
                last_name: "",
                email: "",
                age: 0,
                password: "",
                role: "user",
                id_github: profile._json.id
            }
            const result = await userModel.create(newUser)
            done(null,result)
        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done) => {
        const user = await userModel.findById(id)
        done(null,user)
    })
}

export default initializePassport;