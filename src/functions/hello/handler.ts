import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
// import moment from 'moment'
import { apiResponse } from 'src/common/apiResponse';
import { errorLog } from 'src/common/logger';
import schema from './schema';
import { layerLog } from '/opt/nodejs/logger'

export const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event): Promise<APIGatewayProxyResult> => {
  layerLog('INFO', 'this is from the lambda layer')

  // console.log(`Time is ${moment.now()}`);
  return formatJSONResponse({
    message: `Hello, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(hello);

export const errorTest = middyfy(async (event: APIGatewayEvent) => {
  layerLog('INFO', 'this is from the lambda layer')
  let data = JSON.parse(event.body);
  try {

    throw new Error("Manual error from the errorTest handler");
  }
  catch (err) {
    errorLog({
      type: 'CRITICAL',
      message: err.message,
      callstack: err.stack,
      payload: data
    })

    return apiResponse._500({ err });
  }
})
