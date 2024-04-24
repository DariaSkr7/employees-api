import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";

import * as employeeModel from "../models/employee-model"
import { byIdSchema, byIdType } from "../schemas/employee-schemas";

export default function getEmployeeById(fastify: FastifyInstance): RouteOptions {
    return {
        method: "GET",
        url: "/api/employees/:id",
        schema: {
            params: byIdSchema
        },
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const { id } = request.params as byIdType
            const empl = await employeeModel.getById(fastify, Number(id))

            if (!empl) {
                reply.code(404).send({ error: "Employee is not found" })
            } else {
                reply.code(200).send(empl);
            }
        }
    }
}