export const authUser = (req,res,next) => {
    if(!req.user) return res.status(401).json({message:"unauthorized"})
    if(req.user.role !=="user") return res.status(400).json({message:"no Permissions"})
    next()
} 

export const authAdmin = (req,res,next) => {
    if(!req.user) return res.status(401).json({message:"unauthorized"})
    if(req.user.role !=="admin") return res.status(400).json({message:"no Permissions"})
    next()
} 