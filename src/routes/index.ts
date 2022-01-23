import express, { Request, Response } from "express";
import { topPlayersController, topClubsController, categoryController } from "../controllers";

namespace API {
    export const apiRouter: express.Router = express.Router();

    (function registerRoutes() {
        apiRouter.get("/stats/top/players/:category", topPlayersController);
        apiRouter.get("/stats/top/clubs/:category", topClubsController);
		apiRouter.get("/category/:type", categoryController);
    })();

    export function controller(_req: Request, res: Response) {
        return res.status(200).json({
            topPlayer: {
                route: "/api/v1/stats/top/players/:category",
                params: {
                    category: "/api/v1/category/players",
                },
            },
            topClub: {
                route: "/api/v1/stats/top/clubs/:category",
                params: {
                    categroy: "/api/v1/category/clubs",
                },
            },
        });
    }

    apiRouter.get("", API.controller);
}

export default API.apiRouter;
