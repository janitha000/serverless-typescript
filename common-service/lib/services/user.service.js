import { UserModel } from '../models';
export default class UserService {
    async createUser(user) {
        let result = await UserModel.create(user);
        if (result)
            return { data: user, message: 'User created.' };
        return 'Error creating user';
    }
    async getAllUsers() {
        let users = await UserModel.find();
        return users;
    }
    async getUserById(id) {
        let user = await UserModel.findById(id);
        return user;
    }
}
//# sourceMappingURL=user.service.js.map