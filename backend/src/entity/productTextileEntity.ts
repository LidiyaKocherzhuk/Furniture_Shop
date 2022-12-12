import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { ProductEntity } from './productEntity';

interface IProductTextileExtends extends ICommonFields{
    productId: number;
    textileId: number;

}
export interface IProductTextile{
    productId: number;
    textileId: number;
}

@Entity('product_textile', { database: config.DATABASE_NAME })
export class ProductTextileEntity extends CommonFieldsEntity implements IProductTextileExtends {
    @Column({
        type: 'int',
        nullable: false,
    })
        productId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        textileId: number;

    @ManyToOne(
        () => ProductEntity,
        (user) => user.textiles,
        { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
    )
    @JoinColumn({ name: 'productId' })
        product: ProductEntity;
}
