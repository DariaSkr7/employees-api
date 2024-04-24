import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";

import * as tribesModel from "../models/tribe-model"

export default function getTribes(fastify: FastifyInstance): RouteOptions {
    return {
        method: "GET",
        url: "/api/tribes",
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const tribes = tribesModel.getAll()
            reply.code(200).send(tribes);
        }
    }
}