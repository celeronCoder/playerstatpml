import { Request, Response } from "express";
import { topClubsCategory, topPlayersCategory } from "../models";

async function categoryController(req: Request, res: Response) {
	let categoryType: any = req.params.type;

	if (categoryType == "players") {
		res.status(200).json(topPlayersCategory);
	} else if (categoryType == "clubs") {
		res.status(200).json(topClubsCategory);
	} else {
		res.status(500).json({
			msg: "bad request"
		});
	}
}

export default categoryController;