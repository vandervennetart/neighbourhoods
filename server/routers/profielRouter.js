import express from "express";
import { profielValidator } from "../middelware/profielValidation.js";
import { getAllProfiles, getProfile, createProfile } from "../controllers/profiel.js";

const profielRouter = express.Router();

profielRouter
    .route("/")
    .get(getAllProfiles)
    .post(profielValidator, createProfile);

profielRouter.route("/:id").get(getProfile);

export default profielRouter;
