import { handlerPath } from '@libs/handler-resolver';
export const expressRoutes = {
    handler: `${handlerPath(__dirname)}/handler.expressRoutes`,
    events: [
        {
            httpApi: {
                method: 'ANY',
                path: "/messages/{proxy+}",
            },
        },
    ],
};
//# sourceMappingURL=index.js.map