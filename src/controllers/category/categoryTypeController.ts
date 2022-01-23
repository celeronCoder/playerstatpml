import { Request, Response } from "express";
import categoryTypes from "../../models/category";

async function categoryTypeController(req: Request, res: Response) {
	res.status(200).json(categoryTypes);
}

export default categoryTypeController;