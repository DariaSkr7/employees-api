import { FastifyInstance } from "fastify";
import getEmployees from "./get-employees";
import deleteEmployeeById from "./delete-employee-by-id";
import getTribesById from "./get-tribes-by-id";
import getTribes from "./get-tribes";
import postEmployees from "./post-employee";
import getEmployeeById from "./get-employee-by-id";
import getEmployeesReport from "./get-employees-report";
import deleteCache from "./delete-cache";


export default async function routes(fastify: FastifyInstance) {
    fastify.route(postEmployees(fastify))
    fastify.route(getEmployees(fastify))
    fastify.route(getEmployeeById(fastify))
    fastify.route(deleteEmployeeById(fastify))
    fastify.route(getTribes(fastify))
    fastify.route(getTribesById(fastify))
    fastify.route(getEmployeesReport(fastify))
    fastify.route(deleteCache(fastify))
}
