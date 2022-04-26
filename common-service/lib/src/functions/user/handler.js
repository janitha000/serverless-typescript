import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { userService } from '../../services';
import { v4 } from "uuid";
import { dbConnection } from '../../dbConfig';
export const getAllUsers = middyfy(async (event) => {
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
//# sourceMappingURL=handler.js.map