import passport from "passport";




export const passportCall = (strategy) =>{

    return (req,res,next) => {
        passport.authenticate(strategy,{session:false},(error,user,info) => {
        if(error) return next(error)
        if(!user) return res.redirect("/login")
        req.user = user
        next()
    })(req,res,next)
    }
}

export const passportCallPublic = (strategy) => {
    return (req,res,next) => {
        passport.authenticate(strategy,{session:false},(error,user,info) => {
        if(error) return next(error)
        if(!user) return next()
        req.user = user
        next()
    })(req,res,next)
    }
}

export const passportCallApi = (strategy) => {
    return (req,res,next) => {
        passport.authenticate(strategy,{session:false},(error,user,info) => {
        if(error) return next(error)
        if(!user) return res.status(401).json({message:info.message ? info.message : "server error"})
        req.user = user
        next()
    })(req,res,next)
    }
}


