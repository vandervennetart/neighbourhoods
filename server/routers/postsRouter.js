import express from "express";
import { postValidator } from "../middelware/postValidation.js";
import { getAllPosts, getPost, createPost, getAllOrganised, getAllParticipant } from "../controllers/post.js";

const postsRouter = express.Router();

postsRouter.route("/").get(getAllPosts).post(postValidator, createPost);

postsRouter.route("/:id").get(getPost);

postsRouter.route("/ofProfile/:id/organiseerd").get(getAllOrganised);
postsRouter.route("/ofProfile/:id/deelname").get(getAllParticipant);

export default postsRouter;
