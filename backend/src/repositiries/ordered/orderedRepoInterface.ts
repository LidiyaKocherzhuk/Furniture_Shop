import { UpdateResult } from 'typeorm';

import { IOrdered, OrderedEntity } from '../../entity';

export interface IOrderedRepo {
    save(data: IOrdered): Promise<OrderedEntity>,
    update(id: number, data: Partial<IOrdered>):Promise<UpdateResult>,
    getOrderedPriceCount(id: number): Promise<{ orderedPriceCount: number } | undefined>,
    delete(id: number): Promise<void>,
}
