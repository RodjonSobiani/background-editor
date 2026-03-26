import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import * as Minio from "minio";
import { logger } from "./logger";

export let minioClient: Minio.Client;

declare module "fastify" {
  interface FastifyInstance {
    minioClient: Minio.Client;
    minioBucket: string;
  }
}

export const MinioPlugin: FastifyPluginAsync = fp(
  async (fastify: FastifyInstance): Promise<void> => {
    try {
      const endPoint = process.env.S3_ENDPOINT!;
      const bucketName = process.env.S3_BUCKET_NAME;
      const accessKey = process.env.S3_BUCKET_NAME;
      const secretKey = process.env.S3_SECRET_ACCESS_KEY;
      const useSSL = "true";

      if (!endPoint || !secretKey || !bucketName) {
        new Error(
          "MINIO_END_POINT, MINIO_SECRET_KEY and MINIO_BUCKET_NAME environment variables are required",
        );
      }

      const minioConfig: Minio.ClientOptions = {
        endPoint,
        accessKey,
        secretKey,
        useSSL: useSSL === "true",
      };

      const client = new Minio.Client(minioConfig);
      if (!(await client.bucketExists(bucketName!))) {
        logger.error(`Bucket "${bucketName}" does not exist`);
      }
      logger.info("[MinIO]: connection established");

      fastify.decorate("minioClient", client);
      fastify.decorate("minioBucket", bucketName!);

      minioClient = client;
    } catch (e) {
      logger.info("[MinIO]: failed to establish connection. See details:");
      logger.error(e);
    }
  },
  { name: "minioPlugin" },
);
