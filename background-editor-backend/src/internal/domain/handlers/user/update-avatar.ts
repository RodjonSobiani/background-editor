import {FastifyReply, FastifyRequest} from "fastify";
import {IZodUpdateAvatarInput} from "../../validation/user/update-avatar";
import {removeImage} from "../../services/images";
import {updateAvatarUserService} from "../../services/auth/update-avatar";
import {findUserById} from "../../repository/user";
import {IHandlingResponseError} from "../../../shared/error-handler";
import {HttpStatus} from "../../../shared/http-status";
import {EHandlingErrorType} from "../../../common/enums/errors";

export async function updateAvatarHandler(
    request: FastifyRequest<IZodUpdateAvatarInput>,
    reply: FastifyReply,
) {
    const {avatar} = request.body;
    const {id} = request.user as { id: string };

    try {
        const user = await findUserById(id);

        if (!user) {
            const info: IHandlingResponseError = {
                type: EHandlingErrorType.NOT_FOUND,
                property: "user",
            };
            return reply.code(HttpStatus.NOT_FOUND).send(info);
        }

        if (user?.avatar)
            await removeImage(request.server, [user.avatar])


        await updateAvatarUserService({userId: id, avatar});
        reply.code(HttpStatus.OK).send({success: true});
    } catch (error) {
        if (error instanceof Error) {
            const info: IHandlingResponseError = {
                type: EHandlingErrorType.BAD_REQUEST,
                property: "avatar",
            };
            return reply.code(HttpStatus.BAD_REQUEST).send(info);
        }

        const info: IHandlingResponseError = {
            type: EHandlingErrorType.INTERNAL_SERVER_ERROR,
        };
        return reply.code(HttpStatus.INTERNAL_SERVER_ERROR).send(info);
    }
}
