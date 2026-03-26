import {createWorkingArea} from "../../repository/working-area";
import {ZodWorkingAreaCreateInput} from "../../validation/working-area/create";
import {FastifyInstance} from "fastify";


export async function createWorkingAreaService(data: ZodWorkingAreaCreateInput & {
    user_id?: string
}, fastify: FastifyInstance) {


    const workingArea = await createWorkingArea(data, fastify);
    if (!workingArea) {
        throw new Error("Working Area not created");
    }


    return workingArea;
}
