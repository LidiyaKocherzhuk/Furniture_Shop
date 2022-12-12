import { IProductTextile, ProductTextileEntity } from '../../../entity';

export interface IProductTextileRepo {
    save(data: IProductTextile): Promise<ProductTextileEntity>;
}
