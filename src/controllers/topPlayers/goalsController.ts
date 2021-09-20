import { Response, Request } from "express";
import scrapePlayerData from "../../scraper";

async function topGoalsController(req: Request, res: Response) {
    return res.status(200).json({
        topScorers: await scrapePlayerData("goals"),
    });
}

export default topGoalsController;
