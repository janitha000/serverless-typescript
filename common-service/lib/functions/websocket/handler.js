import { formatJSONResponse } from '@libs/api-gateway';
import { ApiGatewayManagementApi } from 'aws-sdk';
import { layerLog } from '/opt/nodejs/logger';
import { dbConnection } from 'src/dbConfig';
import { webSocketConnection } from 'src/models/websocket-connection.model';
const success = {
    statusCode: 200,
    body: 'Success'
};
export const connectManager = async (event, _context, cb) => {
    await dbConnection();
    if (event.requestContext.eventType === 'CONNECT') {
        console.log(event);
        layerLog('INFO', `Connection id from the client ${event.requestContext.connectionId}`);
        await new webSocketConnection({ connectionId: event.requestContext.connectionId, userId: "1" }).save();
        cb(null, success);
    }
    else if (event.requestContext.eventType === "DISCONNECT") {
        layerLog('INFO', `Disconnection id from the client ${event.requestContext.connectionId}`);
        cb(null, success);
    }
};
export const onMessage = () => {
};
export const onDefault = () => {
};
export const sendMessage = async (event) => {
    await dbConnection();
    let conId = await webSocketConnection.find({ userId: "1" }).exec();
    let connectionId = conId[0].connectionId;
    console.log(`connection id: ${connectionId}`);
    const payload = { message: "This is a message from webscoket" };
    const endpoint = `${event.requestContext.domainName}/${event.requestContext.stage}`;
    console.log(event.requestContext);
    const apigwManagementApi = new ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: endpoint
    });
    const params = {
        ConnectionId: connectionId,
        Data: JSON.stringify(payload)
    };
    await apigwManagementApi.postToConnection(params).promise();
    return formatJSONResponse({
        message: `Hello, welcome to the exciting Serverless world!`,
        event,
    });
};
//# sourceMappingURL=handler.js.map