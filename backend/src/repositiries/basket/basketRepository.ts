import { getManager, UpdateResult } from 'typeorm';

import { BasketEntity, IBasket } from '../../entity';
import { IBasketRepo } from './basketRepoInterface';

class BasketRepository implements IBasketRepo {
    async save(data: IBasket): Promise<BasketEntity> {
        return getManager()
            .getRepository(BasketEntity)
            .save(data);
    }

    async update(id: number, data: Partial<IBasket>):Promise<UpdateResult> {
        return getManager()
            .getRepository(BasketEntity)
            .update(id, data);
    }

    async getBasketPriceCount(id: number): Promise<{ basketPriceCount: number } | undefined> {
        return getManager()
            .getRepository(BasketEntity)
            .createQueryBuilder('basket')
            .where({ userId: id })
            .select('SUM(basket.productCountPrice)', 'basketPriceCount')
            .getRawOne();
    }

    async delete(id: number): Promise<void> {
        await getManager()
            .getRepository(BasketEntity)
            .delete({ id });
    }
}

export const basketRepository = new BasketRepository();
