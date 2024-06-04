import express from "express";
import morgan from "morgan";
import postsRouter from "./routers/postsRouter.js";
import profielRouter from "./routers/profielRouter.js";

import cors from "cors"

//make a new app
const app = express();

//middelware
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

// 2. Routers
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/profiles", profielRouter);

// app.use("/api/v1/postsOfProfile", postsOfProfile);

export { app };


