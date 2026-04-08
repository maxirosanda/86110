import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/github",passport.authenticate("github"))

router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/failLogin"}),(req,res)=>{
    res.send("logiado con github")
})

router.get("/failLogin",(req,res)=>{
    res.send("fallo el login")
})

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            return res.send("error al cerrar sesion")
        }
        res.send("cerrada la sesion")
    })
})

export default router;
