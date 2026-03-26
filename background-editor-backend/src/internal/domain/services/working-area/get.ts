import {findWorkingAreaById} from "../../repository/working-area";
import {getPresignedUrl} from "../images";
import {FastifyInstance} from "fastify";

export async function getByIdWorkingAreaService(id: string, fastify: FastifyInstance) {

    const workingArea = await findWorkingAreaById(id);
    if (!workingArea) {
        throw new Error("Working Area not found");
    }
    const images = []
    for (const image of workingArea.images) {
        const history = []
        const filteredHistory = (image.history as Array<any>).filter(h => h.image_id === image.id)
        for (const historyElement of filteredHistory) {
            history.push(await getPresignedUrl(fastify, historyElement.url))
        }
        images.push({...image, history, url: await getPresignedUrl(fastify, image.url)});
    }
    return {
        ...workingArea, images
    };
}
