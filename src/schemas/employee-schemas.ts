import { Static, Type } from "@sinclair/typebox";

export const byIdSchema = Type.Object({
    id: Type.Number({ minimum: 0 })
})

export type byIdType = Static<typeof byIdSchema>

export const employeeSearchQuerySchema = Type.Object({
    name: Type.Optional(Type.String({ minLength: 1 })),
    title: Type.Optional(Type.String({ minLength: 1 })),
    tribe: Type.Optional(Type.String({ minLength: 1 }))
})

export const employeePostBodySchema = Type.Object({
    name: Type.String({ minLength: 1 }),
    title: Type.String({ minLength: 1 }),
    tribeId: Type.Number({ minimum: 0 }),
})

export type employeeSearchQueryType = Static<typeof employeeSearchQuerySchema>
export type postBodyType = Static<typeof employeePostBodySchema>
