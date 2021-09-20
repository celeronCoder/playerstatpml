import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import csurf from "csurf";

import httpLogger from "./middlewares/httpLogger";
import apiRouter from "./routes";
import { errorController } from "./controllers";

const app: express.Express = express();

(function config() {
    app.use(httpLogger);
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(compression());
    app.use(cors());
    app.use(csurf());
    app.use(helmet());
    app.disable("x-powered-by");
    app.set("trust proxy", 1);
})();

app.use("/api/v1", apiRouter);
app.use(errorController);

export default app;
