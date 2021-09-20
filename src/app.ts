import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import httpLogger from "./middlewares/httpLogger";
import apiRouter from "./routes";
import { errorController } from "./controllers";

// file deepcode ignore UseCsurfForExpress: ignored until found a configuration for csurf.
const app: express.Express = express();

(function config() {
    app.use(httpLogger);
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(
        compression({
            level: 6,
            filter: (req: Request, res: Response) => {
                if (req.headers["x-no-compression"]) {
                    return false;
                }
                return compression.filter(req, res);
            },
        })
    );
    app.use(cors());
    app.use(helmet());
    app.disable("x-powered-by");
    app.set("trust proxy", 1);
})();

app.use("/api/v1", apiRouter);
app.use(errorController);

export default app;
