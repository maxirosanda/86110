import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/",authUser, (req, res) => {
    res.send("Productos");
});

export default router;