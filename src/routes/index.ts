import express, { Request, Response } from "express";
import {
    topGoalsController,
    topAssistController,
    topPassController,
} from "../controllers";

const apiRouter: express.Router = express.Router();

apiRouter.get("/topGoals", topGoalsController);
apiRouter.get("/topAssist", topAssistController);
apiRouter.get("/topPass", topPassController);

namespace API {
    interface Route {
        path: string;
        method: "GET" | "POST" | "PUT" | "DELETE";
    }

    const routes: Route[] = [];

    for (let i = 0; i < apiRouter.stack.length; i++) {
        routes.push({
            path: apiRouter.stack[i].route.path,
            method: apiRouter.stack[i].route.stack[0].method.toUpperCase(),
        });
    }

    export function controller(req: Request, res: Response) {
        return res.status(200).json({
            routes,
        });
    }
}

apiRouter.get("", API.controller);

export default apiRouter;
