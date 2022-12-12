import { getManager } from 'typeorm';

import { IProductTextile, ProductTextileEntity } from '../../../entity';

class ProductTextileRepository {
    save(data: IProductTextile): Promise<ProductTextileEntity> {
        return getManager().getRepository(ProductTextileEntity).save(data);
    }
}

export const productTextileRepository = new ProductTextileRepository();
