import { Request, Response } from "express";
import topPlayersCategory from "../../models/category/topPlayersCategory";
import { scrapePlayerData } from "../../scraper/stat";

async function topPlayersController(req: Request, res: Response) {
    const category: string = req.params.category;

    topPlayersCategory.includes(category)
        ? res.status(200).json(await scrapePlayerData(category))
        : res.status(400).json({
              message: "bad request",
          });
}

export default topPlayersController;
