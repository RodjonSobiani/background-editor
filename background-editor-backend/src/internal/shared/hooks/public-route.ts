import {FastifyContextConfig, FastifyInstance, FastifyReply} from "fastify";
import {HttpStatus} from "../http-status";
import {deleteExpiredTokens} from "../../domain/repository/auth";

declare module "fastify" {
    interface FastifyContextConfig {
        isPublic?: boolean;
    }
}

export const usePublicRoute = async (
    app: FastifyInstance,
): Promise<void | FastifyReply> => {
    app.addHook("onRequest", async (request, reply) => {
        const config = request.routeOptions.config as
            | FastifyContextConfig
            | undefined;

        if (request.url.startsWith("/docs")) {
            return;
        }

        try {
            (request as any).user = await request.jwtVerify();
            await deleteExpiredTokens();
        } catch (err) {
            if (config?.isPublic === true) {
                return;
            }
            console.error(`[usePublicRoute] JWT verification failed:`, err);
            reply
                .code(HttpStatus.UNAUTHORIZED)
                .send({message: "Unauthorized action"});
        }
    });
};
