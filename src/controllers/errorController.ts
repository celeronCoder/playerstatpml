import { Request, Response } from "express";

function errorController(req: Request, res: Response) {
    const error = new Error("not found!");
    return res.status(404).json({
        message: error.message,
    });
}

export default errorController;
