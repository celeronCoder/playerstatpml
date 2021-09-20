import { Response, Request } from "express";
import { topAssists } from "../../scraper";

async function topAssistController(req: Request, res: Response) {
    res.status(200).json({
        topAssist: await topAssists(),
    });
}

export default topAssistController;
