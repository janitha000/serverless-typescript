import { APIGatewayEvent } from "aws-lambda";
import { APIGatewayTokenAuthorizerEvent } from "aws-lambda";

export const auth = async (event: APIGatewayTokenAuthorizerEvent) => {
    const authorization = event.authorizationToken;

    if (authorization === 'Bearer TEST123') {
        return {
            principalId: 'anonymous',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: event.methodArn,
                    },
                ],
            },
        };
    }
    else {
        return {
            principalId: 'anonymous',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: event.methodArn,
                    },
                ],
            },
        };
    }
}

export const login = (event: APIGatewayEvent) => {
    console.log('login called')
    console.log(event)
}