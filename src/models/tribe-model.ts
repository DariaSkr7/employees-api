import { FastifyInstance } from "fastify";

const TABLE_NAME = "tribes";

export interface Tribe {
    id: number,
    name: string,
    department: string
}

export async function getAll(fastify: FastifyInstance): Promise<Tribe[]> {
    return fastify.excel.from(TABLE_NAME).select();
}

export async function getById(fastify: FastifyInstance, id: number): Promise<Tribe | null> {
    const res = await fastify.excel.from(TABLE_NAME).where({ id }).select()

    if (res.length === 1) {
        return res[0]
    }

    return null
}