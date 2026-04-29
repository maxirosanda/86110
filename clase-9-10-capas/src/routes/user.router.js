import { Router } from "express";
import { passportCallApi } from "../utils/passportCall.js";
import { register, login, logout } from "../controllers/users.controller.js";

const router = Router()

router.post("/register",passportCallApi("register"),register)

router.post("/login",passportCallApi("login"),login)

router.get("/logout",logout)



export default router