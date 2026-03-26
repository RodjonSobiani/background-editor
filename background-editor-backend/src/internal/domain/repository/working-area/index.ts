import knex from "../../../database/knex/connection-knex";
import {ZodWorkingAreaCreateInput} from "../../validation/working-area/create";
import {groupBy, map} from "lodash";
import {FastifyInstance} from "fastify";
import {getPresignedUrl} from "../../services/images";
import {ML_HTTPS_SERVICES} from "../../../shared/axios";


const removeBg = async (fastify: FastifyInstance, {image_id, image}: { image_id: string, image: string }) => {
    const presignedImage = await getPresignedUrl(fastify, image)
    return {
        image_id,
        image: await
            ML_HTTPS_SERVICES.post('/remove-background', {input_url: presignedImage})
                .then(res => res.data.image_path).catch(res => console.log(res))
    };
}

export const createWorkingArea = async ({user_id, images}: ZodWorkingAreaCreateInput & {
    user_id?: string
}, fastify: FastifyInstance) => {
    try {
        const workingArea = await knex("working-areas").insert({user_id}).returning('*').then(res => res?.[0]);
        const imagesRes = await knex("images").insert(images.map(image => ({
            image,
            working_area_id: workingArea.id
        }))).returning('*').then(res => res);
        const removedBgImages = imagesRes.map(image => removeBg(fastify, {image_id: image.id, image: image.image}));
        const history = await Promise.all(removedBgImages);
        await knex('edits').insert(history);
        const grouped = groupBy(history, 'image_id')
        return {
            ...workingArea,
            images: imagesRes.map(item => ({url: item.image, history: map(grouped[item.id], 'image')}))
        }
    } catch (error) {
        console.error("Error creating working area:", error);
        throw error;
    }
};
export const deleteWorkingArea = async (id: string) => {
    try {
        return await knex("working-areas").where({id}).delete();

    } catch (error) {
        console.error("Error creating working area:", error);
        throw error;
    }
};

export const findWorkingAreaById = async (id: string) => {
    try {
        const imagesRes = await knex("images").where({working_area_id: id});
        const imagesResIds = map(imagesRes, 'id');
        const historyRes = (await knex("edits").whereIn('image_id', imagesResIds).orderBy('created_at', 'asc')).map(item => ({
            id: item.id, url: item.image, image_id: item.image_id
        }));
        const workingArea = await knex("working-areas").where({id}).first();
        if (!workingArea) {
            return Error("Working Area not found");
        }
        return {...workingArea, images: imagesRes.map(item => ({id: item.id, url: item.image, history: historyRes}))}
    } catch (error) {
        console.error("Error finding working area by ID:", error);
        throw error;
    }
};
export const updateWorkingAreaById = async (id: string, body: { images: string[] }) => {
    try {
        return await knex("working-areas").where({id}).update({images: body.images});
    } catch (error) {
        console.error("Error finding working area by ID:", error);
        throw error;
    }
};

export const removeImageWorkingAreaById = async (id: string, {ids}: { ids: string[] }) => {
    try {
        const edits = map(await knex("edits").whereIn('image_id', ids).del().returning('image'), 'image')
        const removeImages = map(await knex("images").whereIn('id', ids).where({working_area_id: id}).del().returning('image'), 'image');
        return {
            count: await knex("images").where({working_area_id: id}).count('id').then(res => res[0].count),
            removeImages: removeImages.concat(edits)
        };
    } catch (error) {
        console.error("Error finding working area by ID:", error);
        throw error;
    }
};

export const addImagesWorkingAreaById = async (id: string, {images}: {
    images: string[]
}, fastify: FastifyInstance) => {
    try {
        const imagesRes = await knex("images").insert(images.map(image => ({
            image,
            working_area_id: id
        }))).returning('*');
        const removedBgImages = imagesRes.map(image => removeBg(fastify, {image_id: image.id, image: image.image}));
        const history = await Promise.all(removedBgImages);
        await knex('edits').insert(history);

    } catch (error) {
        console.error("Error finding working area by ID:", error);
        throw error;
    }
};

export const addHistoryImage = async (id: string, image: string) => {
    try {
        return await knex("edits").insert({
            image_id: id, image
        });
    } catch (error) {
        console.error("Error finding working area by ID:", error);
        throw error;
    }
};

export const getImages = async (id: string, working_area_id: string) => {
    try {
        return await knex("images").select('*').where({id, working_area_id,}).first();
    } catch (error) {
        console.error("Error finding working area by ID:", error);
        throw error;
    }
};
