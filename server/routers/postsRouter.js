import express from "express";
import { postValidator } from "../middelware/postValidation.js";
import { getAllPosts, getPost, getAllOrganised, getAllParticipant } from "../controllers/post.js";

const postsRouter = express.Router();

postsRouter.route("/posts?:sort").get(getAllPosts)


postsRouter.route("/posts/:id").get(getPost);

postsRouter.route("/posts/ofProfile/:id/organiseerd").get(getAllOrganised);
postsRouter.route("/posts/ofProfile/:id/deelname").get(getAllParticipant);

export default postsRouter;
