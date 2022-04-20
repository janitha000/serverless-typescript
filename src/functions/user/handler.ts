import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import { userService } from '../../services'
import { v4 } from "uuid";
import { createUserSchema } from './schema'
import { dbConnection } from '../../dbConfig'
import { apiResponse } from 'src/common/apiResponse';


export const getAllUsers = middyfy(async (event): Promise<APIGatewayProxyResult> => {
    await dbConnection();
    const users = await userService.getAllUsers();
    return formatJSONResponse({ users });
});

export const createUser: ValidatedEventAPIGatewayProxyEvent<typeof createUserSchema> = middyfy(async (event): Promise<APIGatewayProxyResult> => {
    try {
        await dbConnection();
        const userId = v4();
        let { firstName, lastName } = event.body;
        const user = await userService.createUser({ firstName, lastName, userId });

        return formatJSONResponse({ user });
    }
    catch (e) {
        console.log(e);
        return formatJSONResponse({ status: 500, message: e });
    }
})

export const getUserById = middyfy(async (event): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters?.id;
    console.log(id)
    await dbConnection();
    const user = await userService.getUserById(id);

    if (!user) return apiResponse._400({ message: 'User with the id not found' });

    return apiResponse._200(user);

});

