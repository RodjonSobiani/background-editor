import {FastifyInstance} from "fastify";
import {changeEmailHandler, changeNameHandler} from "../../handlers/user";
import {
    ZodChangeEmailInputSchema,
    ZodChangeNameInputSchema,
    ZodChangePasswordInputSchema,
} from "../../validation/user";
import {changePasswordHandler} from "../../handlers/user/change-password";
import {ZodUpdateAvatarInputSchema} from "../../validation/user/update-avatar";
import {updateAvatarHandler} from "../../handlers/user/update-avatar";
import {getHistoryHandler} from "../../handlers/user/history";

export const userRoutes = async (app: FastifyInstance) => {
    app.post(
        "/change-name",
        {schema: ZodChangeNameInputSchema},
        changeNameHandler,
    );

    app.post(
        "/change-email",
        {schema: ZodChangeEmailInputSchema},
        changeEmailHandler,
    );
    app.post(
        "/update-avatar",
        {schema: ZodUpdateAvatarInputSchema},
        updateAvatarHandler,
    );

    app.post(
        "/change-password",
        {schema: ZodChangePasswordInputSchema},
        changePasswordHandler,
    );

    app.get(
        "/history",
        getHistoryHandler,
    );
};
