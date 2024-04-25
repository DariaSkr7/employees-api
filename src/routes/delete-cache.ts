import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";

import * as employeeModel from "../models/employee-model"
import { byIdSchema, byIdType } from "../schemas/employee-schemas";

export default function deleteCache(fastify: FastifyInstance): RouteOptions {
    return {
        method: "DELETE",
        url: "/api/cache",
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            await fastify.cache.del("report")
            reply.code(200).send({status: "done"});
        }
    }
}