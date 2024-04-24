import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";

import * as tribesModel from "../models/tribe-model"
import { byIdSchema, byIdType } from "../schemas/employee-schemas";

export default function getTribesById(fastify: FastifyInstance): RouteOptions {
    return {
        method: "GET",
        url: "/api/tribes/:id",
        schema: {
            params: byIdSchema
        },
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const { id } = request.params as byIdType
            const tribe = tribesModel.getById(Number(id))

            if (!tribe) {
                reply.code(404).send({ error: "Tribe is not found" })
            } else {
                reply.code(200).send(tribe);
            }
        }
    }
}