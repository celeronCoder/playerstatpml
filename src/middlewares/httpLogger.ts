import { Handler } from "express";
import morgan, { StreamOptions } from "morgan";
import { Logger } from "../utils";

const stream: StreamOptions = {
    write: (message) => Logger.http(message),
};

function skip(): boolean {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
}
const morganMiddleWare: Handler = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);

export default morganMiddleWare;
