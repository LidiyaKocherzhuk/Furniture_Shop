import { getManager, UpdateResult } from 'typeorm';

import { BedPriceEntity, IBedPrice } from '../../entity';
import { IBedPriceRepo } from './bedPriceRepoInterface';

class BedPriceRepository implements IBedPriceRepo {
    saveBedPrice(data: IBedPrice): Promise<BedPriceEntity> {
        return getManager()
            .getRepository(BedPriceEntity)
            .save(data);
    }

    updateBedPrice(id: number, data: Partial<IBedPrice>): Promise<UpdateResult> {
        return getManager()
            .getRepository(BedPriceEntity)
            .update({ id }, data);
    }
}

export const bedPriceRepository = new BedPriceRepository();
