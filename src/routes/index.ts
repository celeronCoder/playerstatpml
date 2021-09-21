import express, { Request, Response } from "express";
import { topPlayersController, topClubsController } from "../controllers";
import topClubsCategory from "../models/topClubsCategory";
import topPlayersCategory from "../models/topPlayersCategory";

const apiRouter: express.Router = express.Router();

(function registerRoutes() {
    apiRouter.get("/topPlayers/:category", topPlayersController);
    apiRouter.get("/topClubs/:category", topClubsController);
})();

namespace API {
    export function controller(req: Request, res: Response) {
        return res.status(200).json({
            topPlayer: {
                route: "/topPlayers/:category",
                params: {
                    category: topPlayersCategory,
                },
            },
            topClub: {
                route: "/topClubs/:category",
                params: {
                    categroy: topClubsCategory,
                },
            },
        });
    }
}

apiRouter.get("", API.controller);

export default apiRouter;
