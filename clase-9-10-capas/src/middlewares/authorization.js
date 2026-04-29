export const authUserHbs = (req,res,next) => {
    if(!req.user) return res.redirect("/login")
    if(req.user.role !=="user") return res.redirect("/create-product")
    next()
} 

export const authAdminHbs = (req,res,next) => {
    if(!req.user) return res.redirect("/login")
    if(req.user.role !=="admin") return res.redirect("/")
    next()
}


export const authUserApi = (req,res,next) => {
    if(!req.user) return res.status(401).json({message:"unauthorized"})
    if(req.user.role !=="user") return res.status(400).json({message:"no Permissions"})
    next()
} 

export const authAdminApi = (req,res,next) => {
    if(!req.user) return res.status(401).json({message:"unauthorized"})
    if(req.user.role !=="admin") return res.status(400).json({message:"no Permissions"})
    next()
} 
