import express from "express";
import morgan from "morgan";
import postsRouter from "./routers/postsRouter.js";
import profielRouter from "./routers/profielRouter.js";
import cookieParser from "cookie-parser"

import cors from "cors"
import authenticateRouter from "./routers/authenticate.js";

//make a new app
const app = express();

//middelware
const corsOptions = {
    origin : ["neighbourhoods.artvandervennet.ikdoeict.be","http://localhost:5173"],
    credentials : true
}

app.use(express.json({limit: "50mb"}));
app.use(morgan("combined"));
app.use(cookieParser())
app.use(cors(corsOptions));


// 2. Routers
app.use("/api/v1/", postsRouter);
app.use("/api/v1/", profielRouter);
app.use("/api/v1/authenticate", authenticateRouter);

// app.use("/api/v1/postsOfProfile", postsOfProfile);

export { app };


