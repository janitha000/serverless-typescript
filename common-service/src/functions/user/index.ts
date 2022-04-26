import { handlerPath } from '@libs/handler-resolver';
import { createUserSchema } from './schema'
export const getUsers = {
    handler: `${handlerPath(__dirname)}/handler.getAllUsers`,
    events: [
        {
            http: {
                method: 'get',
                path: 'users/'
            },
        },
    ],
};

export const createUser = {
    handler: `${handlerPath(__dirname)}/handler.createUser`,
    events: [
        {
            http: {
                method: 'post',
                path: 'users/'
            },
            request: {
                schemas: {
                    'application/json': createUserSchema,
                },
            },
        },
    ],
};

export const getUserById = {
    handler: `${handlerPath(__dirname)}/handler.getUserById`,
    events: [
        {
            http: {
                method: 'get',
                path: 'users/{id}'
            },
        },
    ],
};
