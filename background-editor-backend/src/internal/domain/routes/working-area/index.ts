import {FastifyInstance} from "fastify";
import {ZodWorkingAreaCreateInputSchema} from "../../validation/working-area/create";
import {createWorkingAreaHandler} from "../../handlers/working-area/create";
import {getByIdWorkingAreaHandler} from "../../handlers/working-area/get";
import {ZodWorkingAreaGetByIdInputSchema} from "../../validation/working-area/get";
import {
  addImagesWorkingAreaHandler,
  removeBackgroundImageHandler,
  removeImagesWorkingAreaHandler,
  replaceBackgroundImageHandler,
} from "../../handlers/working-area/update";
import {
  ZodWorkingAreaAddImagesInputSchema,
  ZodWorkingAreaRemoveImagesInputSchema,
} from "../../validation/working-area/update";
import {ZodWorkingAreaRemoveBackgroundImageInputSchema} from "../../validation/working-area/remove-background";
import {ZodWorkingAreaReplaceBackgroundImageInputSchema} from "../../validation/working-area/replace-background";

export const workingAreaRoutes = async (app: FastifyInstance) => {
    app.post(
        "/",
        {schema: ZodWorkingAreaCreateInputSchema, config: {isPublic: true}},
        createWorkingAreaHandler,
    );
    app.get(
        "/:id",
        {schema: ZodWorkingAreaGetByIdInputSchema, config: {isPublic: true}},
        getByIdWorkingAreaHandler,
    );
    app.post(
        "/:id/remove-images",
        {
            schema: ZodWorkingAreaRemoveImagesInputSchema,
            config: {isPublic: true},
        },
        removeImagesWorkingAreaHandler,
    );
    app.post(
        "/:id/add-images",
        {schema: ZodWorkingAreaAddImagesInputSchema, config: {isPublic: true}},
        addImagesWorkingAreaHandler,
    );
    app.post(
        "/:id/remove-background",
        {schema: ZodWorkingAreaRemoveBackgroundImageInputSchema, config: {isPublic: true}},
        removeBackgroundImageHandler,
    );
    app.post(
        "/:id/replace-background",
        {schema: ZodWorkingAreaReplaceBackgroundImageInputSchema, config: {isPublic: true}},
        replaceBackgroundImageHandler,
    );
};
