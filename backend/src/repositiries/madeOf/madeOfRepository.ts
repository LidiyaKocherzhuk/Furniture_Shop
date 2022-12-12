import { getManager } from 'typeorm';

import { IMadeOf, MadeOfEntity } from '../../entity';
import { IMadeOfRepo } from './madeOfRepoInterface';

class MadeOfRepository implements IMadeOfRepo {
    async save(data: IMadeOf): Promise<MadeOfEntity> {
        return getManager()
            .getRepository(MadeOfEntity)
            .save(data);
    }

    async getAll(): Promise<MadeOfEntity[]> {
        return getManager()
            .getRepository(MadeOfEntity)
            .find();
    }
}

export const madeOfRepository = new MadeOfRepository();
