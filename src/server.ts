import http from "http";
import cluster from "cluster";
import { cpus } from "os";
import process from "process";
import throng from "throng";

import { Logger } from "./utils";
import app from "./app";

const PORT = process.env.PORT ?? 8080;
const numCPUs: number = cpus().length;
const WORKERS: number = parseInt(`${process.env.WEB_CONCURRENCY}`) || 1;

namespace Server {
    export function start(): void {
        if (cluster.isPrimary) {
            Logger.debug(`Primary ${process.pid} is running.`);

            // keep track of http requests.
            let numReqs = 0;
            setInterval(() => {
                Logger.debug(`Number of requests: ${numReqs}`);
            });

            // count requests.
            function messageHandler(msg: any): void {
                if (msg.cmd && msg.cmd === "notifyRequest") numReqs += 1;
            }

            // fork workers.
            for (let i = 0; i < numCPUs; i++) {
                const worker = cluster.fork();

                worker.on("exit", (code: number, signal: string) => {
                    if (signal)
                        Logger.debug(`Worker was killed by signal: ${signal}.`);
                    else if (code !== 0)
                        Logger.debug(`Worker exited with error code: ${code}.`);
                    else Logger.debug("Worker success!");
                });
            }

            for (const id in cluster.workers) {
                cluster.workers[id]?.on("message", messageHandler);
            }

            cluster.on("exit", (worker, code, signal) => {
                Logger.debug(`Worker ${worker.process.pid} died.`);
            });
        } else {
            createServer();

            Logger.debug(`Worker ${process.pid} started.`);
        }
    }

    function createServer(): void {
        const httpServer: http.Server = http.createServer(app);

        if (process.env.NODE_ENV !== "test") {
            httpServer.listen(PORT, () => {
                Logger.info(`Server started on port ${PORT}`);
            });

            process.on("exit", () => httpServer.close());
        }
    }
}

throng({ worker: Server.start, count: WORKERS });

export default app;
