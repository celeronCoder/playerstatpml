import { Request, Response } from "express";
import ClubData from "../models/ClubData";
import topClubsCategory from "../models/topClubsCategory";
import { scrapeClubData } from "../scraper";
import { DEFAULT_EXPIRATION } from "../utils/redisClient";
import { redisClient } from "../utils";

async function topClubsController(req: Request, res: Response) {
    const category: string = req.params.category;

    if (topClubsCategory.includes(category)) {
        //   deepcode ignore Ssrf: Ingored until csurf implementation;
        const data: ClubData[] = await scrapeClubData(category);
        res.status(200).json({
            clubs: data,
        });
        redisClient.setex(
            `topClub-${category}`,
            DEFAULT_EXPIRATION,
            JSON.stringify(data)
        );
    } else {
        res.status(400).json({
            message: "bad request",
        });
    }
}

export default topClubsController;
