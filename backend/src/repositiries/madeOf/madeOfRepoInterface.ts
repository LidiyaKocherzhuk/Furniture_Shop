import { IMadeOf, MadeOfEntity } from '../../entity';

export interface IMadeOfRepo {
    save(data: IMadeOf): Promise<MadeOfEntity>;
    getAll(): Promise<MadeOfEntity[]>;
}
