import { Request, Response } from "express";
import topPlayersCategory from "../routes/topPlayersCategory";
import scrapePlayerData from "../scraper";

async function topPlayersController(req: Request, res: Response) {
    const category: string = req.params.category;

    topPlayersCategory.includes(category)
        ? res.status(200).json({
              players: await scrapePlayerData(category),
          })
        : res.status(400).json({
              message: "bad request",
          });
}

export default topPlayersController;