import {FastifyInstance} from "fastify";
import {presignedImageHandler, uploadImageHandler, uploadImagesHandler} from "../../handlers/images/upload-image";
import {ZodGetPresignedUrlInputSchema} from "../../validation/image/get";

export const uploadRoutes = async (app: FastifyInstance) => {
    app.post("/image", {config: {isPublic: true}}, uploadImageHandler);
    app.post("/images", {config: {isPublic: true}}, uploadImagesHandler);
    app.get("/presigned-image/:folder/:name", {
        config: {isPublic: true},
        schema: ZodGetPresignedUrlInputSchema
    }, presignedImageHandler);
};

