import express, { Request, Response } from "express";
import topScorerController from "../controllers/topScorerController";

const apiRouter: express.Router = express.Router();

apiRouter.get("/topScorers", topScorerController);

export default apiRouter;
