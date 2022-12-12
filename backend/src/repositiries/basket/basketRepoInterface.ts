import { UpdateResult } from 'typeorm';

import { BasketEntity, IBasket } from '../../entity';

export interface IBasketRepo {
    save(data: IBasket): Promise<BasketEntity>,
    update(id: number, data: Partial<IBasket>):Promise<UpdateResult>,
    getBasketPriceCount(id: number): Promise<{ basketPriceCount: number } | undefined>,
    delete(id: number): Promise<void>,
}
