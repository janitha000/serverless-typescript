import { handlerPath } from '@libs/handler-resolver';

export const scheduled = {
    handler: `${handlerPath(__dirname)}/handler.scheduledMain`,
    layers: [
        "${cf:layers-${self: provider.stage}.lambdaloggingexport}"
    ],
    events: [
        {
            schedule: {
                rate: ['rate(24 hours)'],
                input: {
                    "key": "message from lambda"
                }
            }
        },
        // {
        //     schedule: {
        //         rate: ['rate(2 minute)'],
        //         input: {
        //             "key": "message from lambda with 2 minutes"
        //         }
        //     },
        // }

    ],
};

export const createSchedule = {
    handler: `${handlerPath(__dirname)}/handler.createSchedule`,
    events: [
        {
            http: {
                method: 'get',
                path: 'schedule'
            },
        },
    ],
};

export const getCloudFormationOutput = {
    handler: `${handlerPath(__dirname)}/handler.getCloudFormationOutput`,
    events: [
        {
            http: {
                method: 'get',
                path: 'cloudformation'
            },
        },
    ],
};


