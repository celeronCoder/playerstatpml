import dotenv from "dotenv";
import http from "http";

import logger from "./utils/logger";
import app from "./app";

dotenv.config();

const PORT: number =
    process.env.PORT === undefined ? 8080 : parseInt(process.env.PORT);

(function start() {
    const httpServer: http.Server = http.createServer(app);

    if (process.env.NODE_ENV !== "test") {
        httpServer.listen(PORT, "localhost", () => {
            logger.info(`Server started on port ${PORT}`);
        });
    }
})();

export default app;
