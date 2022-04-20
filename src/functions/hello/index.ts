// import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  layers: [
    // "arn:aws:lambda:ap-southeast-1:628640267234:layer:logging:2",
    "${cf:layers-${self: provider.stage}.lambdaloggingexport}"

  ],
  events: [
    {
      http: {
        method: 'get',
        path: 'hello',
        // request: {
        //   schemas: {
        //     'application/json': schema,
        //   },
        // },
      },
    },
  ],
};


// /  layers: `${cf: layers- ${ self: provider.stage }.lambdaloggingexport}`
