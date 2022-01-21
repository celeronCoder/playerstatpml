import express, { Request, Response } from "express";
import { topPlayersController, topClubsController } from "../controllers";
import topClubsCategory from "../models/category/topClubsCategory";
import topPlayersCategory from "../models/category/topPlayersCategory";

namespace API {
    export const apiRouter: express.Router = express.Router();

    (function registerRoutes() {
        apiRouter.get("/stats/top/players/:category", topPlayersController);
        apiRouter.get("/stats/top/clubs/:category", topClubsController);
    })();

    export function controller(req: Request, res: Response) {
        return res.status(200).json({
            topPlayer: {
                route: "/api/v1/stats/top/players/:category",
                params: {
                    category: topPlayersCategory,
                },
            },
            topClub: {
                route: "/api/v1/stats/top/players/:category",
                params: {
                    categroy: topClubsCategory,
                },
            },
        });
    }

    apiRouter.get("", API.controller);
}

export default API.apiRouter;
