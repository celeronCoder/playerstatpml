import { Request, Response } from "express";
import { scrapeClubData } from "../../scraper/stat";

async function topClubsController(req: Request, res: Response) {
    const category: string = req.params.category;

    res.status(200).json({
        //   deepcode ignore Ssrf: <please specify a reason of ignoring this>
        clubs: await scrapeClubData(category),
    });
}

export default topClubsController;
