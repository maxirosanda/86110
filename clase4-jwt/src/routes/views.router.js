import { Router } from "express";
import { authToken } from "../utils/jsonwebtoken.js";

const router = Router();

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/home", authToken, (req, res) => {
    res.render("home", {nombre: "maxi"});
});

export default router;