import { Response, Request } from "express";
import { topScorers } from "../../scraper";

async function topScorerController(req: Request, res: Response) {
    res.status(200).json({
        topScorers: await topScorers(),
    });
}

export default topScorerController;
