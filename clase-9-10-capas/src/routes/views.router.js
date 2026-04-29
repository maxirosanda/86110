import { Router } from "express";
import { authUserHbs, authAdminHbs } from "../middlewares/authorization.js";
import { passportCallHbs,passportCallHbsPublic } from "../utils/passportCall.js";
import {
     homeView,
     registerView,
     loginView,
     createProductView,
     notFoundView 
} from "../controllers/views.controller.js";

const router = Router()

router.get("/",passportCallHbs("jwt"),authUserHbs,homeView)
router.get("/register",passportCallHbsPublic("jwt"),registerView)
router.get("/login",passportCallHbsPublic("jwt"),loginView)
router.get("/create-product",passportCallHbs("jwt"),authAdminHbs,createProductView)
router.get(/.*/,notFoundView)

export default router