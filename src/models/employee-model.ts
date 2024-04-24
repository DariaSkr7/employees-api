import { employeeSearchQueryType, postBodyType } from "../schemas/employee-schemas";
import { Tribe, getById as getTribesById } from "./tribe-model";

export interface Employee {
    id: number,
    name: string,
    title: string,
    tribe: Tribe,
}

const employees: Employee[] = [
    {
        id: 0,
        name: "John Doe",
        title: "Chief Happiness Officer",
        tribe: {
            id: 1,
            name: "InternStallar",
            department: "Other Engineering"
        }
    },
    {
        id: 1,
        name: "Daria Skoryk",
        title: "Itern",
        tribe: {
            id: 2,
            name: "InternStallar2",
            department: "Other Engineering"
        }
    },
    {
        id: 2,
        name: "Ann D",
        title: "Itern",
        tribe: {
            id: 2,
            name: "InternStallar2",
            department: "Other Engineering"
        }
    }
]

export function getAll(): Employee[] {
    return structuredClone(employees);
}

export function create(body: postBodyType): Employee | null {
    const newId = Math.max(...employees.map((x) => x.id)) + 1
    const tribe = getTribesById(body.tribeId)

    if (tribe === null) {
        return null
    }

    const newEmpl: Employee = {
        id: newId,
        title: body.title,
        tribe: tribe,
        name: body.name
    }
    employees.push(newEmpl)
    return structuredClone(newEmpl)
}

export function getById(id: number): Employee | null {
    const result = employees.filter(x => x.id === id);

    if (result.length === 1) {
        return structuredClone(result[0])
    }

    return null
}

export function search(query: employeeSearchQueryType): Employee[] {
    const filtered = employees
        .filter(x => !query.name || query.name === x.name)
        .filter(x => !query.title || query.title === x.title)
        .filter(x => !query.tribe || query.tribe === x.tribe.name)

    return structuredClone(filtered)
}

export function deleteById(id: number): number | null {
    const index = employees.findIndex(x => x.id === id);

    if (index === -1) {
        return null
    }

    employees.splice(index, 1)
    return id;
}
