import express, { Request, Response } from "express";
import { topPlayersController } from "../controllers";
import clubController from "../controllers/clubController";
import topPlayersCategory from "./topPlayersCategory";

const apiRouter: express.Router = express.Router();

(function registerRoutes() {
    apiRouter.get("/topPlayers/:category", topPlayersController);
    apiRouter.get("/clubs", clubController);
})();

namespace API {
    interface Route {
        path: string;
        categories: string[];
        method: "GET" | "POST" | "PUT" | "DELETE";
    }

    const routes: Route[] = [];

    (function getRoutes() {
        for (let i = 0; i < apiRouter.stack.length; i++) {
            routes.push({
                path: apiRouter.stack[i].route.path,
                categories: topPlayersCategory,
                method: apiRouter.stack[i].route.stack[0].method.toUpperCase(),
            });
        }
    })();

    export function controller(req: Request, res: Response) {
        return res.status(200).json({
            routes,
        });
    }
}

apiRouter.get("", API.controller);

export default apiRouter;
