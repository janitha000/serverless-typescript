import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { apiResponse } from 'src/common/apiResponse';
import { errorLog } from 'src/common/logger';
import { layerLog } from '/opt/nodejs/logger';
export const hello = async (event) => {
    layerLog('INFO', 'this is from the lambda layer');
    return formatJSONResponse({
        message: `Hello, welcome to the exciting Serverless world!`,
        event,
    });
};
export const main = middyfy(hello);
export const errorTest = middyfy(async (event) => {
    layerLog('INFO', 'this is from the lambda layer');
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
        });
        return apiResponse._500({ err });
    }
});
//# sourceMappingURL=handler.js.map