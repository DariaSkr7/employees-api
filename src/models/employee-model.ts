import { FastifyInstance } from "fastify";
import { employeeSearchQueryType, postBodyType } from "../schemas/employee-schemas";
import { Tribe, getById as getTribesById } from "./tribe-model";

const TABLE_NAME = "employees";
const EMPLOYEES_REPORT_CACHE_KEY = "report"

export interface EmployeeDTO {
    id: number,
    name: string,
    title: string,
    tribe: Tribe,
}

interface EmployeeQueryResult {
    id: number;
    name: string;
    title: string;
    "tribe.id": number;
    "tribe.name": string;
    "tribe.department": string;
}

const formatEmployeeDTO = (employee: EmployeeQueryResult): EmployeeDTO => {
    return {
        id: employee.id,
        name: employee.name,
        title: employee.title,
        tribe: {
            id: employee["tribe.id"],
            name: employee["tribe.name"],
            department: employee["tribe.department"],
        },
    };
};

export async function getAll(fastify: FastifyInstance): Promise<EmployeeDTO[]> {
    const employees = await fastify.excel.from(TABLE_NAME).innerJoin("tribes", "tribes.id", "employees.tribe_id").select(
        "employees.id as id",
        "employees.name as name",
        "employees.title as title",
        "tribes.id as tribe.id",
        "tribes.name as tribe.name",
        "tribes.department as tribe.department"
    )

    return employees.map(formatEmployeeDTO);
}

export async function create(fastify: FastifyInstance, body: postBodyType): Promise<number> {
    await fastify.cache.del(EMPLOYEES_REPORT_CACHE_KEY)
    return await fastify.excel.from(TABLE_NAME).insert({ name: body.name, title: body.title, tribe_id: body.tribeId });
}

export async function getById(fastify: FastifyInstance, id: number): Promise<EmployeeDTO | null> {
    const result: EmployeeQueryResult[] = await fastify.excel
        .from(TABLE_NAME)
        .innerJoin("tribes", "tribes.id", "employees.tribe_id")
        .where({ id })
        .select(
            "employees.id as id",
            "employees.name as name",
            "employees.title as title",
            "tribes.id as tribe.id",
            "tribes.name as tribe.name",
            "tribes.department as tribe.department"
        );

    if (result.length === 0) {
        return null;
    }

    return formatEmployeeDTO(result[0]);
}

export async function search(fastify: FastifyInstance, query: employeeSearchQueryType): Promise<EmployeeDTO[]> {
    let result: EmployeeQueryResult[] = []

    if (query.name || query.title || query.tribe) {
        result = await fastify.excel.from(TABLE_NAME).innerJoin("tribes", "tribes.id", "employees.tribe_id").where('employees.name', '=', query.name ?? "").orWhere('employees.title', '=', query.title ?? "").select(
            "employees.id as id",
            "employees.name as name",
            "employees.title as title",
            "tribes.id as tribe.id",
            "tribes.name as tribe.name",
            "tribes.department as tribe.department"
        )
    } else {
        result = await fastify.excel.from(TABLE_NAME).innerJoin("tribes", "tribes.id", "employees.tribe_id").select(
            "employees.id as id",
            "employees.name as name",
            "employees.title as title",
            "tribes.id as tribe.id",
            "tribes.name as tribe.name",
            "tribes.department as tribe.department"
        )
    }

    return result.map(formatEmployeeDTO)
}

export async function deleteById(fastify: FastifyInstance, id: number): Promise<number> {
    return fastify.excel.from(TABLE_NAME).where({ id }).del();
}

interface EmployeeReportDTO {
    id: number,
    name: string,
    title: string,
    tribe_id: number,
}

interface TribeReportDTO {
    id: number,
    name: string,
    department: string
    employees: EmployeeReportDTO[] | undefined
}


export async function report(fastify: FastifyInstance): Promise<TribeReportDTO[]> {
    const cache = await fastify.cache.get(EMPLOYEES_REPORT_CACHE_KEY);

    if (cache) {
        console.log("returned cached result")
        return JSON.parse(cache)
    }

    let tribes: TribeReportDTO[] = await fastify.excel.from("tribes").select("id", "name", "department");
    const employees: EmployeeReportDTO[] = await fastify.excel.from(TABLE_NAME).select("id", "name", "title", "tribe_id");

    tribes = tribes.map(t => {
        t.employees = employees.filter(e => e.tribe_id === t.id)
        return t
    })

    await fastify.cache.set(EMPLOYEES_REPORT_CACHE_KEY, JSON.stringify(tribes), { EX: 10 })
    return tribes;
}