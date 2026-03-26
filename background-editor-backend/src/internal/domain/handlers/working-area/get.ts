import {FastifyReply, FastifyRequest} from "fastify";
import {getByIdWorkingAreaService} from "../../services/working-area/get";
import {IZodWorkingAreaGetByIdInput} from "../../validation/working-area/get";

export async function getByIdWorkingAreaHandler(
    request: FastifyRequest<IZodWorkingAreaGetByIdInput>,
    reply: FastifyReply,
) {
    try {
        const {id} = request.params;

        const workingArea = await getByIdWorkingAreaService(id, request.server);

        reply.send(workingArea).status(200);
    } catch (error) {
        reply.status(500).send({message: "An unknown error occurred"});

    }
}

