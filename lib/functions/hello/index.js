import { handlerPath } from '@libs/handler-resolver';
export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    layers: [
        "${cf:layers-${self: provider.stage}.lambdaloggingexport}"
    ],
    events: [
        {
            http: {
                method: 'get',
                path: 'hello',
            },
        },
    ],
};
//# sourceMappingURL=index.js.map