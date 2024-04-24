import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";

import * as employeeModel from "../models/employee-model"
import { byIdSchema, byIdType } from "../schemas/employee-schemas";

export default function deleteEmployeeById(fastify: FastifyInstance): RouteOptions {
    return {
        method: "DELETE",
        url: "/api/employees/:id",
        schema: {
            params: byIdSchema
        },
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const { id } = request.params as byIdType
            const deleted = await employeeModel.deleteById(fastify, Number(id))

            if (deleted === null) {
                reply.code(404).send({ error: "Employee is not found" })
            } else {
                reply.code(200).send({deleted});
            }
        }
    }
}