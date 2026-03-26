import {FastifyInstance} from "fastify";
import * as Minio from "minio";
import {Readable} from "stream";

export async function uploadImageToMinio(
    fastify: FastifyInstance,
    objectName: string,
    fileStream: AsyncIterable<Uint8Array>,
    mimetype: string,
) {
    const minioClient = fastify.minioClient as Minio.Client;
    const bucketName = fastify.minioBucket as string;

    if (!minioClient || !bucketName) {
        throw new Error("MinIO client does not setting");
    }

    let fileSize = 0;
    const chunks: Buffer[] = [];
    for await (const chunk of fileStream) {
        chunks.push(Buffer.from(chunk));
        fileSize += chunk.length;
    }

    const finalStream = Readable.from(Buffer.concat(chunks));

    await minioClient.putObject(bucketName, objectName, finalStream, fileSize, {
        "Content-Type": mimetype,
    });
}

export async function getPresignedUrl(fastify: FastifyInstance, filename: string) {
    const minioClient = fastify.minioClient as Minio.Client;
    const bucketName = fastify.minioBucket as string;

    return await minioClient.presignedGetObject(bucketName, filename, 3600);
}

export async function removeImage(fastify: FastifyInstance, objectName: string[]) {
    const minioClient = fastify.minioClient as Minio.Client;
    const bucketName = fastify.minioBucket as string;

    return await minioClient.removeObjects(bucketName, objectName);
}

