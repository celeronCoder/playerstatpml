import dotenv from "dotenv";
import http from "http";

import logger from "./utils/logger";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT ?? 8080;

(function start() {
    const httpServer: http.Server = http.createServer(app);

    if (process.env.NODE_ENV !== "test") {
        httpServer.listen(PORT, "localhost", () => {
            logger.info(`Server started on port ${PORT}`);
        });
    }
})();

export default app;
