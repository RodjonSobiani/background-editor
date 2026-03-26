import fastify from "fastify";
import fastifyMultipart from "@fastify/multipart";
import routes from "../routes";
import {appErrorPipe, zodValidatorCompiler,} from "../../../internal/shared/error-handler";
import {MinioPlugin} from "../../../internal/shared/minio";
import fastifyCron from 'fastify-cron';
import {removeCronWorkingAreaHandler} from "../../../internal/domain/handlers/working-area/remove";

const buildApp = async () => {
    const app = fastify({logger: false});

    app.setValidatorCompiler(zodValidatorCompiler);
    app.setErrorHandler(appErrorPipe);

    await app.register(MinioPlugin);
    await app.register(fastifyMultipart);

    await app.register(routes, {prefix: "/api"});

    app.register(fastifyCron, {
        jobs: [
            {
                name: 'remove working areas',
                cronTime: '0 0 * * *',
                onTick: removeCronWorkingAreaHandler
            }
        ]
    });


    return app;
};

export default buildApp;
