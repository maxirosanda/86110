import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.render("home", {
        title: "Home",
        mensaje: "Hola mundo"
    });
});

router.get("/reset-password/:code", (req, res) => {
    const { code } = req.params;
    res.render("reset-password", {
        code,
    });
});

export default router;
