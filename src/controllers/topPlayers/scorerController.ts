import { Response, Request } from "express";
import scrapePlayerData from "../../scraper";

async function topScorerController(req: Request, res: Response) {
    res.status(200).json({
        topScorers: await scrapePlayerData("goals"),
    });
}

export default topScorerController;
