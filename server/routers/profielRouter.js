import express from "express";
import { profielValidator } from "../middelware/profielValidation.js";
import { getAllProfiles, getProfile, createProfile,getProfielFoto } from "../controllers/profiel.js";

const profielRouter = express.Router();

profielRouter
    .route("/profiles/")
    .post(profielValidator, createProfile)

profielRouter.route("/profiles?:zoeken")
    .get(getAllProfiles)

profielRouter.route("/profiles/:id").get(getProfile);
profielRouter.route("/profiles/foto/:id").get(getProfielFoto);

export default profielRouter;
