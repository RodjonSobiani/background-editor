import {checkDbConnections} from "../internal/database";
import {config} from "../app/config";
import buildApp from "../app/core/build-app";

const startServer = async () => {
    await checkDbConnections();

    const app = await buildApp();

    try {
        await app.listen({port: config.app.port, host: "0.0.0.0"});
        app.cron.startAllJobs()
        console.log(`Server running at http://localhost:${config.app.port}/api`);
    } catch (err) {
        console.error("Server failed to start: ", err);
        process.exit(1);
    }
};

startServer().catch((err) => {
    console.error("Error: ", err);
    process.exit(1);
});
