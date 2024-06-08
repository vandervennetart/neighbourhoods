import express from "express";
import {
    activiteitMakenValidation,
    authenticateToken,
    loginValidation,
    registerValidation,
    updateValidation
} from "../middelware/authenticateValidation.js";
import {
    login,
    register,
    getProfielData,
    getNewAccessToken,
    logout,
    updateProfiel,
    inschrijven,
    getPost,
    makePost

} from "../controllers/authenticate.js";

const authenticateRouter = express.Router();

authenticateRouter.route("/login").post(loginValidation, login)
authenticateRouter.route("/register").post(registerValidation, register)
authenticateRouter.route("/logout").post(logout)

authenticateRouter.route("/profiel").get(authenticateToken, getProfielData).patch(authenticateToken, updateValidation, updateProfiel)



authenticateRouter.route("/token").get(getNewAccessToken)



authenticateRouter.route("/inschrijven/:id").post(authenticateToken, inschrijven)

authenticateRouter.route("/posts/:id").post(authenticateToken, getPost)
authenticateRouter.route("/activiteitMaken").post(authenticateToken, activiteitMakenValidation , makePost)


export default authenticateRouter;

