import { UpdateResult } from 'typeorm';

import { BedPriceEntity, IBedPrice } from '../../entity';

export interface IBedPriceRepo {
    saveBedPrice(data: IBedPrice): Promise<BedPriceEntity>;
    updateBedPrice(id: number, data: Partial<IBedPrice>): Promise<UpdateResult>;
}
