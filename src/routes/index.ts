import express from "express";
import { topScorerController, topAssistController } from "../controllers";

const apiRouter: express.Router = express.Router();

apiRouter.get("/topScorers", topScorerController);
apiRouter.get("/topAssist", topAssistController);

export default apiRouter;
