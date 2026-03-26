import {
    addHistoryImage,
    addImagesWorkingAreaById,
    deleteWorkingArea,
    findWorkingAreaById,
    getImages,
    removeImageWorkingAreaById
} from "../../repository/working-area";
import {ZodWorkingAreaRemoveBackgroundImageInput} from "../../validation/working-area/remove-background";
import {getPresignedUrl, removeImage} from "../images";
import {FastifyInstance} from "fastify";
import {ZodWorkingAreaReplaceBackgroundImageInput} from "../../validation/working-area/replace-background";
import {ML_HTTPS_SERVICES} from "../../../shared/axios";

export async function removeImageByIdWorkingAreaService(id: string, body: { ids: string[] }, server: FastifyInstance) {
    const workingArea = await findWorkingAreaById(id);
    if (!workingArea) {
        throw new Error("Working Area not found");
    }
    const {count, removeImages} = await removeImageWorkingAreaById(id, body);
    await removeImage(server, removeImages)
    if (!count) {
        await deleteWorkingArea(id);
    }
    return true;
}

export async function addImagesByIdWorkingAreaService(id: string, body: {
    images: string[]
}, fastify: FastifyInstance) {
    const workingArea = await findWorkingAreaById(id);
    if (!workingArea) {
        throw new Error("Working Area not found");
    }
    await addImagesWorkingAreaById(id, body, fastify);
    return true;
}


export async function removeBackgroundImageService(id: string, body: ZodWorkingAreaRemoveBackgroundImageInput, fastify: FastifyInstance) {
    const image = await getImages(body.image_id, id);
    if (!image) {
        throw new Error("Image not found");
    }

    const presignedImage = await getPresignedUrl(fastify, image.image)
    const ml_image = await ML_HTTPS_SERVICES.post('/remove-background', {input_url: presignedImage})
        .then(res => res.data.image_path).catch(res => console.log(res));

    await addHistoryImage(body.image_id, ml_image);
    return await getPresignedUrl(fastify, ml_image);
}

export async function replaceBackgroundImageService(id: string, body: ZodWorkingAreaReplaceBackgroundImageInput, fastify: FastifyInstance) {
    const image = await getImages(body.image_id, id);
    if (!image) {
        throw new Error("Image not found");
    }

    const presignedImage = await getPresignedUrl(fastify, image.image)
    const ml_image = await ML_HTTPS_SERVICES.post('/replace-background', {
        input_url: presignedImage,
        background: body.background
    }).then(res => res.data.image_path).catch(res => console.log(res));

    await addHistoryImage(body.image_id, ml_image);
    return await getPresignedUrl(fastify, ml_image);
}
