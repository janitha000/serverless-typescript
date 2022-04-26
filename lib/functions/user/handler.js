import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { userService } from '../../services';
import { v4 } from "uuid";
import { dbConnection } from '../../dbConfig';
import { apiResponse } from 'src/common/apiResponse';
export const getAllUsers = middyfy(async (_event) => {
    await dbConnection();
    const users = await userService.getAllUsers();
    return formatJSONResponse({ users });
});
export const createUser = middyfy(async (event) => {
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
});
export const getUserById = middyfy(async (event) => {
    const id = event.pathParameters?.id;
    console.log(id);
    await dbConnection();
    const user = await userService.getUserById(id);
    if (!user)
        return apiResponse._400({ message: 'User with the id not found' });
    return apiResponse._200(user);
});
//# sourceMappingURL=handler.js.map