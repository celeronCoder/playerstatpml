import http from "http";

import { Logger } from "./utils";
import app from "./app";

const PORT = process.env.PORT ?? 8080;

(function start() {
    const httpServer: http.Server = http.createServer(app);

    if (process.env.NODE_ENV !== "test") {
        httpServer.listen(PORT, () => {
            Logger.info(`Server started on port ${PORT}`);
        });

        process.on("exit", () => httpServer.close());
    }
})();

export default app;
