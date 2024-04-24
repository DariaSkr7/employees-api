import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";

import * as employeeModel from "../models/employee-model"
import { employeeSearchQuerySchema, employeeSearchQueryType } from "../schemas/employee-schemas";

export default function getEmployees(fastify: FastifyInstance): RouteOptions {
    return {
        method: "GET",
        url: "/api/employees",
        schema: {
            querystring: employeeSearchQuerySchema
        },
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const query = request.query as employeeSearchQueryType
            const empl = employeeModel.search(query)

            if (!empl) {
                reply.code(404).send({ error: "Employee is not found" })
            } else {
                reply.code(200).send(empl);
            }
        }
    }
}