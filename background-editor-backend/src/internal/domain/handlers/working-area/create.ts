import {FastifyReply, FastifyRequest} from "fastify";
import {IZodWorkingAreaCreateInput} from "../../validation/working-area/create";
import {createWorkingAreaService} from "../../services/working-area/create";

export async function createWorkingAreaHandler(
    request: FastifyRequest<IZodWorkingAreaCreateInput>,
    reply: FastifyReply,
) {
    try {
        const {images} = request.body;

        const user = request.user as { id: string } | undefined;

        const workingArea = await createWorkingAreaService({images, user_id: user?.id}, request.server);

        reply.status(201).send(workingArea);
    } catch (error) {
        reply.status(500).send({message: "An unknown error occurred"});

    }
}

