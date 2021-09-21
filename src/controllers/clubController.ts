import { Request, Response } from "express";
import { scrapeClubData } from "../scraper";

async function clubController(req: Request, res: Response) {
    res.status(200).json({
        clubs: await scrapeClubData(),
    });
}

export default clubController;
