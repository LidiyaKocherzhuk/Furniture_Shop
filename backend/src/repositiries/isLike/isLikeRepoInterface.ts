import { IIsLike, IsLikeEntity } from '../../entity';

export interface IIsLikeRepo {
    save(data: IIsLike): Promise<IsLikeEntity>;
    delete(data: Partial<IIsLike>): Promise<void>;
}
