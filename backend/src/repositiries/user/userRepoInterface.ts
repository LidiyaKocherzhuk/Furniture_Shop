import { IUser, IUserExtends, UserEntity } from '../../entity';

export interface IUserRepo {
    save(user: IUser): Promise<UserEntity>;
    getById(id: number): Promise<UserEntity | undefined>;
    getByParams(params: Partial<IUserExtends>): Promise<UserEntity | undefined>;
    update(user:Partial<IUser>, id: number): Promise<void>;
    getNewUsers(): Promise<UserEntity[]>;
    delete(id: number): Promise<void>;
}
