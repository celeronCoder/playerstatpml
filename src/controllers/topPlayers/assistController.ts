import { Response, Request } from "express";
import scrapePlayerData from "../../scraper";

async function topAssistController(req: Request, res: Response) {
    res.status(200).json({
        topAssist: await scrapePlayerData("goal_assist"),
    });
}

export default topAssistController;
