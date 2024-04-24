import { FastifyInstance } from "fastify";
import { employeeSearchQueryType, postBodyType } from "../schemas/employee-schemas";
import { Tribe, getById as getTribesById } from "./tribe-model";

const TABLE_NAME = "employees";

export interface Employee {
    id: number,
    name: string,
    title: string,
    tribe: Tribe,
}

export async function getAll(fastify: FastifyInstance): Promise<Employee[]> {
    return await fastify.excel.from(TABLE_NAME).select()
}

export async function create(fastify: FastifyInstance, body: postBodyType): Promise<number> {
    return await fastify.excel.from(TABLE_NAME).insert({ name: body.name, title: body.title, tribe_id: body.tribeId });
}

export async function getById(fastify: FastifyInstance, id: number): Promise<Employee | null> {
    const result: Employee[] = await fastify.excel
        .from(TABLE_NAME)
        .where({ id })
        .select();

    if (result.length === 0) {
        return null;
    }

    return result[0];
}

export async function search(fastify: FastifyInstance, query: employeeSearchQueryType): Promise<Employee[]> {
    if (query.name || query.title || query.tribe) {
        return fastify.excel.from(TABLE_NAME).where('name', '=', query.name ?? "").orWhere('title', '=', query.title ?? "").select()
    } else {
        return fastify.excel.from(TABLE_NAME).select()
    }
}

export async function deleteById(fastify: FastifyInstance, id: number): Promise<number> {
    return fastify.excel.from(TABLE_NAME).where({ id }).del();
}
