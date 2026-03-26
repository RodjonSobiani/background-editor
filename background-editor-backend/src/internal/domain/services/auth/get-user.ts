import {findUserByEmail, findUserById} from "../../repository/user";
import {FastifyInstance} from "fastify";
import {getPresignedUrl} from "../images";

export const getUserById = async (userId: string, fastify: FastifyInstance,
) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const {password_hash, ...userData} = user;
    userData.avatar = user.avatar ? await getPresignedUrl(fastify, user.avatar) : user.avatar
    return userData;
};

export const getUserByEmail = async (email: string, fastify: FastifyInstance,
) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    const {password_hash, ...userData} = user;
    userData.avatar = user.avatar ? await getPresignedUrl(fastify, user.avatar) : user.avatar
    return userData;
};
