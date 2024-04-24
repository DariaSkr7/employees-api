import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";

import * as employeeModel from "../models/employee-model"
import { employeePostBodySchema, employeeSearchQuerySchema, employeeSearchQueryType, postBodyType } from "../schemas/employee-schemas";

export default function postEmployees(fastify: FastifyInstance): RouteOptions {
    return {
        method: "POST",
        url: "/api/employees",
        schema: {
            body: employeePostBodySchema
        },
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const body = request.body as postBodyType
            const empl = await employeeModel.create(fastify, body)

            if (!empl) {
                reply.code(400).send({ error: "Something went wrong" })
            } else {
                reply.code(201).send(empl);
            }
        }
    }
}