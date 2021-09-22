import { Request, Response } from "express";
import PlayerData from "../models/PlayerData";
import topPlayersCategory from "../models/topPlayersCategory";
import { scrapePlayerData } from "../scraper";
import { redisClient } from "../utils";
import { DEFAULT_EXPIRATION } from "../utils/redisClient";

async function topPlayersController(req: Request, res: Response) {
    const category: string = req.params.category;

    //   deepcode ignore Ssrf: Ingored until csurf implementation;
    if (topPlayersCategory.includes(category)) {
        //   deepcode ignore Ssrf: Ingored until csurf implementation;
        const data: PlayerData[] = await scrapePlayerData(category);
        res.status(200).json({
            players: data,
        });
        redisClient.setex(
            `topPlayer-${category}`,
            DEFAULT_EXPIRATION,
            JSON.stringify(data)
        );
    } else {
        res.status(400).json({
            message: "bad request",
        });
    }
}

export default topPlayersController;
