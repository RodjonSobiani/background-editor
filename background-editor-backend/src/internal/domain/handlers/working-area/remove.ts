import {type FastifyInstance} from "fastify";
import knex from "../../../database/knex/connection-knex";
import {logger} from "../../../shared/logger";
import {map} from "lodash";
import {removeImage} from "../../services/images";

export async function removeCronWorkingAreaHandler(
    server: FastifyInstance,
) {
    try {

        const removed = map(await knex('working-areas').where('created_at', '<', knex.raw("NOW() - INTERVAL '7 days'")).del().returning('id'), 'id');

        const images = await knex('images').whereIn('working_area_id', removed).select(['id', 'image']);

        const edits = map(await knex('edits').whereIn('image_id', map(images, 'id')).select('image'), 'image');

        await removeImage(server, edits.concat(map(images, 'image')))

        logger.info(`Removed working areas: ${removed.length}`);
        // reply.send().status(204);
    } catch (error) {
        console.log(error)
        // reply.status(500).send({message: "An unknown error occurred"});

    }
}

