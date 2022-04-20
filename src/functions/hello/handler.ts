import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import { log } from 'lambda-logging'

import schema from './schema';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event): Promise<APIGatewayProxyResult> => {
  log('INFO', 'this is from the lambda layer')
  return formatJSONResponse({
    message: `Hello, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);
