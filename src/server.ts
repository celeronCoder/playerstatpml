import http from "http";

import logger from "./utils/logger";
import app from "./app";

const PORT = process.env.PORT ?? 8080;

(function start() {
    const httpServer: http.Server = http.createServer(app);

    if (process.env.NODE_ENV !== "test") {
        httpServer.listen(PORT, () => {
            logger.info(`Server started on port ${PORT}`);
        });

        process.on("exit", () => httpServer.close());
    }
})();

export default app;
