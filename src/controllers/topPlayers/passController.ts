import { Response, Request } from "express";
import scrapePlayerData from "../../scraper";

async function topPassController(req: Request, res: Response) {
    return res.status(200).json({
        topScorers: await scrapePlayerData("total_pass"),
    });
}

export default topPassController;
