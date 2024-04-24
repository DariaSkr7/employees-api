
export interface Tribe {
    id: number,
    name: string,
    department: string
}

const tribes: Tribe[] = [
    {
        id: 1,
        name: "InternStallar",
        department: "Other Engineering"
    },
    {
        id: 2,
        name: "InternStallar2",
        department: "Other Engineering"
    }
]

export function getAll(): Tribe[] {
    return structuredClone(tribes);
}

export function getById(id: number): Tribe | null {
    const result = tribes.filter(x => x.id === id);
    if (result.length === 1) {
        return structuredClone(result[0])
    }

    return null
}