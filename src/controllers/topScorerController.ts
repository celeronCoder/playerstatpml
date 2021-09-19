import { Response, Request } from "express";
import { topScorers } from "../utils/scraper";

function topScorerController(req: Request, res: Response) {
    res.status(200).json({
        topScorers: topScorers,
    });
}

export default topScorerController;
