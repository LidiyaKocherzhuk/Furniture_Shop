import { getManager } from 'typeorm';

import { IIsLike, IsLikeEntity } from '../../entity';
import { IIsLikeRepo } from './isLikeRepoInterface';

class IsLikeRepository implements IIsLikeRepo {
    async save(data: IIsLike): Promise<IsLikeEntity> {
        return getManager()
            .getRepository(IsLikeEntity)
            .save(data);
    }

    async delete(data: Partial<IIsLike>): Promise<void> {
        await getManager()
            .getRepository(IsLikeEntity)
            .delete(data);
    }
}

export const isLikeRepository = new IsLikeRepository();
