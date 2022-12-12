import bcrypt from 'bcryptjs';

import { IUser, IUserExtends, UserEntity } from '../entity';
import { userRepository } from '../repositiries';

class UserService {
    async create(user:IUser): Promise<UserEntity> {
        const hashPassword = await this._hashPassword(user.password);

        return userRepository.save({ ...user, password: hashPassword });
    }

    async userByParams(params: Partial<IUserExtends>) {
        return userRepository.getByParams(params);
    }

    async update(user: IUserExtends, id: number) {
        const hashPassword = await this._hashPassword(user.password);
        await userRepository.update({ password: hashPassword }, id);
    }

    comparePassword(password: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }

    private _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 5);
    }
}

export const userService = new UserService();
