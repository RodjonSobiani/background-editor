import {FastifyReply, FastifyRequest} from "fastify";
import knex from "../../../database/knex/connection-knex";
import {groupBy, map, mapValues, maxBy, orderBy} from "lodash";
import {getPresignedUrl} from "../../services/images";

export async function getHistoryHandler(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const {id} = request.user as { id: string };

        const workingAreas = await knex("working-areas").select('id').where({user_id: id});
        const workingAreasIds = map(workingAreas, 'id')

        const originalImages = await knex('images').select('*').whereIn('working_area_id', workingAreasIds);
        const imagesIds = map(originalImages, 'id')

        const allEdits = await knex('edits').select('*').whereIn('image_id', imagesIds);

        const editsByImageId = groupBy(allEdits, 'image_id');

        const lastEdits = mapValues(editsByImageId, edits =>
            maxBy(edits, 'created_at')
        );

        const result = originalImages.map(image => {
            const imageId = image.id;
            return {...image, ...lastEdits[imageId]};
        });

        const sortedRes = orderBy(result, 'createdAt', 'desc');

        for (const sorted of sortedRes) {
            sorted.image = await getPresignedUrl(request.server, sorted.image)
        }

        reply.send(sortedRes).status(200);
    } catch (error) {
        console.log(error)
        reply.status(500).send({message: "An unknown error occurred"});

    }
}
