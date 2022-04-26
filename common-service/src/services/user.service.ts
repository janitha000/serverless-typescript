import { User } from 'src/models/user.model'
import { UserModel } from '../models'

export default class UserService {
    async createUser(user: User) {
        let result = await UserModel.create(user);
        if (result) return { data: user, message: 'User created.' }
        return 'Error creating user'
    }

    async getAllUsers() {
        let users = await UserModel.find();
        return users;
    }

    async getUserById(id: string) {
        let user = await UserModel.findById(id);
        return user;
    }
}