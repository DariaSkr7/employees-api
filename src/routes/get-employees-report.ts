import { FastifyInstance, FastifyReply, FastifyRequest, RouteOptions } from "fastify";

import * as employeeModel from "../models/employee-model"
import { employeeSearchQuerySchema, employeeSearchQueryType } from "../schemas/employee-schemas";

export default function getEmployeesReport(fastify: FastifyInstance): RouteOptions {
    return {
        method: "GET",
        url: "/api/employees/report",
        handler: async function (request: FastifyRequest, reply: FastifyReply) {
            const empl = await employeeModel.report(fastify)

            if (!empl) {
                reply.code(404).send({ error: "Employee is not found" })
            } else {
                reply.code(200).send(empl);
            }
        }
    }
}