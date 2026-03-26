import {FastifyReply, FastifyRequest} from "fastify";
import {getPresignedUrl, uploadImageToMinio} from "../../services/images";
import {v4 as uuidV4} from "uuid";
import path from "path";
import {IZodGetPresignedUrlInput} from "../../validation/image/get";

export async function uploadImageHandler(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const data = await request.file({limits: {fileSize: 10 * 1024 * 1024}});

        if (!data) {
            return reply.status(400).send({message: "Файл не загружен"});
        }

        let fileExtension = path.extname(data.filename).replace(".", "");

        if (!fileExtension) {
            fileExtension = data.mimetype.split("/").pop() || "bin";
        }

        const objectName = `bg-editor/${uuidV4()}.${fileExtension}`;

        await uploadImageToMinio(
            request.server,
            objectName,
            data.file,
            data.mimetype,
        );

        return reply.status(200).send({
            message: "Файл успешно загружен",
            objectName,
        });
    } catch (error) {
        return reply.status(500).send({
            message: error instanceof Error ? error.message : "Неизвестная ошибка",
        });
    }
}

export async function uploadImagesHandler(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const data = request.files({limits: {fileSize: 10 * 1024 * 1024}});
        const objectNames: string[] = [];
        for await (const file of data) {

            let fileExtension = path.extname(file.filename).replace(".", "");

            if (!fileExtension) {
                fileExtension = file.mimetype.split("/").pop() || "bin";
            }

            const objectName = `bg-editor/${uuidV4()}.${fileExtension}`;

            await uploadImageToMinio(
                request.server,
                objectName,
                file.file,
                file.mimetype,
            );
            objectNames.push(objectName)
            file.file.resume();
        }
        return reply.status(200).send({
            message: "Файлы успешно загружены",
            objectNames,
        });
    } catch (error) {
        return reply.status(500).send({
            message: error instanceof Error ? error.message : "Неизвестная ошибка",
        });
    }
}

export async function presignedImageHandler(
    request: FastifyRequest<IZodGetPresignedUrlInput>,
    reply: FastifyReply,
) {
    try {
        const {folder, name} = request.params;
        const presignedUrl = await getPresignedUrl(request.server, `${folder}/${name}`);

        return reply.status(200).send({
            presignedUrl,
        });
    } catch (error) {
        return reply.status(500).send({
            message: error instanceof Error ? error.message : "Неизвестная ошибка",
        });
    }
}
