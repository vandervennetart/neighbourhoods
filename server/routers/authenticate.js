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
    makePost, delPost, delUser

} from "../controllers/authenticate.js";

const authenticateRouter = express.Router();

authenticateRouter.route("/login").post(loginValidation, login).delete(logout)
authenticateRouter.route("/register").post(registerValidation, register)

authenticateRouter.route("/profiel")
    .get(authenticateToken, getProfielData)
    .patch(authenticateToken, updateValidation, updateProfiel)
authenticateRouter.route("/profiel/:id").delete(authenticateToken,delUser)



authenticateRouter.route("/token").get(getNewAccessToken)

authenticateRouter.route("/posts")
    .post(authenticateToken, activiteitMakenValidation, makePost)

authenticateRouter.route("/posts/:id")
    .get(authenticateToken, getPost)
    .delete(authenticateToken, delPost)

authenticateRouter.route("/posts/inschrijven/:id")
    .post(authenticateToken, inschrijven)

export default authenticateRouter;

