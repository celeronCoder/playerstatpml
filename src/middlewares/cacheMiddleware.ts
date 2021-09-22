import { NextFunction, Request, Response } from "express";
import { Logger, redisClient } from "../utils/";

function cacheMiddleWare(data: "topPlayer" | "topClub") {
    return (req: Request, res: Response, next: NextFunction) => {
        const category: string = req.params.category;

        try {
            redisClient.get(`${data}-${category}`, (err, stats) => {
                if (!err) {
                    if (stats !== null) {
                        res.status(200).json({
                            stats: JSON.parse(stats),
                        });
                    } else next();
                } else {
                    Logger.error(`REDIS GET ERROR ${err}`);
                    next();
                }
            });
        } catch (err: unknown) {
            Logger.error(err);
        }
    };
}

export default cacheMiddleWare;
