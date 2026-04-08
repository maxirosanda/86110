
export async function authAdmin(req,res,next){
    if(!req.isAuthenticated()){
        return res.status(401).send("no autorizado")
    }
    if(req.user.role !== "admin"){
        return res.status(403).send("no autorizado")
    }
    next()
}

export async function authUser(req,res,next){
    if(!req.isAuthenticated()){
        return res.status(401).send("no autorizado")
    }
    if(req.user.role !== "user"){
        return res.status(403).send("no autorizado")
    }
    next()
}
