import { getManager } from 'typeorm';
import dayjs from 'dayjs';

import { IUser, IUserExtends, UserEntity } from '../../entity';
import { IUserRepo } from './userRepoInterface';

class UserRepository implements IUserRepo {
    async save(user: IUser): Promise<UserEntity> {
        return getManager()
            .getRepository(UserEntity)
            .save(user);
    }

    async getAll(limit: number): Promise<UserEntity[]> {
        return getManager()
            .getRepository(UserEntity)
            .find({ relations: ['basket', 'ordered', 'likes', 'meetings', 'comments'], take: limit });
    }

    async getById(id: number): Promise<UserEntity | undefined> {
        return getManager()
            .getRepository(UserEntity)
            .findOne(id, { relations: ['basket', 'ordered', 'likes', 'meetings', 'comments'] });
    }

    async getByParams(params: Partial<IUserExtends>): Promise<UserEntity | undefined> {
        return getManager()
            .getRepository(UserEntity)
            .findOne(params, { relations: ['basket', 'ordered', 'likes', 'meetings', 'comments'] });
    }

    async update(user:Partial<IUser>, id: number): Promise<void> {
        await getManager().getRepository(UserEntity).update(id, user);
    }

    async getNewUsers(): Promise<UserEntity[]> {
        return getManager()
            .getRepository(UserEntity)
            .createQueryBuilder('user')
            .where('user.createdAt >= :data', {
                data: dayjs()
                    .subtract(3, 'h')
                    .subtract(10, 's')
                    .format(),
            })
            .getMany();
    }

    async delete(id: number): Promise<void> {
        await getManager()
            .getRepository(UserEntity)
            .softDelete({ id });
    }
}

export const userRepository = new UserRepository();
