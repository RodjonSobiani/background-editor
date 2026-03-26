import {FastifyReply, FastifyRequest} from "fastify";
import {IZodWorkingAreaAddImagesInput, IZodWorkingAreaRemoveImagesInput} from "../../validation/working-area/update";
import {
    addImagesByIdWorkingAreaService,
    removeBackgroundImageService,
    removeImageByIdWorkingAreaService,
    replaceBackgroundImageService
} from "../../services/working-area/update";
import {IZodWorkingAreaRemoveBackgroundImageInput} from "../../validation/working-area/remove-background";
import {IZodWorkingAreaReplaceBackgroundImageInput} from "../../validation/working-area/replace-background";

export async function addImagesWorkingAreaHandler(
    request: FastifyRequest<IZodWorkingAreaAddImagesInput>,
    reply: FastifyReply,
) {
    try {
        const {id} = request.params;
        const {images} = request.body;

        await addImagesByIdWorkingAreaService(id, {images}, request.server);


        reply.send().status(200);
    } catch (error) {
        reply.status(500).send({message: "An unknown error occurred"});

    }
}

export async function removeImagesWorkingAreaHandler(
    request: FastifyRequest<IZodWorkingAreaRemoveImagesInput>,
    reply: FastifyReply,
) {
    try {
        const {id} = request.params;
        const {ids} = request.body;

        await removeImageByIdWorkingAreaService(id, {ids: ids}, request.server);

        reply.send().status(200);
    } catch (error) {
        reply.status(500).send({message: "An unknown error occurred"});

    }
}


export async function removeBackgroundImageHandler(
    request: FastifyRequest<IZodWorkingAreaRemoveBackgroundImageInput>,
    reply: FastifyReply,
) {
    try {
        const {id} = request.params;


        const image_url = await removeBackgroundImageService(id, request.body, request.server);


        reply.send({image_url}).status(200);
    } catch (error) {
        reply.status(500).send({message: "An unknown error occurred"});

    }
}

export async function replaceBackgroundImageHandler(
    request: FastifyRequest<IZodWorkingAreaReplaceBackgroundImageInput>,
    reply: FastifyReply,
) {
    try {
        const {id} = request.params;

        const image_url = await replaceBackgroundImageService(id, request.body, request.server);


        reply.send({image_url}).status(200);
    } catch (error) {
        reply.status(500).send({message: "An unknown error occurred"});

    }
}
