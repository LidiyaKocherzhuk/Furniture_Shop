import { getManager, UpdateResult } from 'typeorm';

import { IOrderedRepo } from './orderedRepoInterface';
import { IOrdered, OrderedEntity } from '../../entity';

class OrderedRepository implements IOrderedRepo {
    async save(data: IOrdered): Promise<OrderedEntity> {
        return getManager()
            .getRepository(OrderedEntity)
            .save(data);
    }

    async update(id: number, data: Partial<IOrdered>):Promise<UpdateResult> {
        return getManager()
            .getRepository(OrderedEntity)
            .update(id, data);
    }

    async getOrderedPriceCount(id: number): Promise<{ orderedPriceCount: number } | undefined> {
        return getManager()
            .getRepository(OrderedEntity)
            .createQueryBuilder('ordered')
            .where({ userId: id })
            .select('SUM(ordered.productCountPrice)', 'orderedPriceCount')
            .getRawOne();
    }

    async delete(id: number): Promise<void> {
        await getManager()
            .getRepository(OrderedEntity)
            .delete({id});
    }
}

export const orderedRepository = new OrderedRepository();
