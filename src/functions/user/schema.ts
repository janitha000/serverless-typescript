export const createUserSchema = {
    type: "object",
    properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' }
    },
    required: ['firstName', 'lastName']
} as const;