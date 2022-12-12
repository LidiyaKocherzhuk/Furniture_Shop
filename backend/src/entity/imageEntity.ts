import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { ProductEntity } from './productEntity';
import { TextileEntity } from './textileEntity';

export interface IImageExtends extends ICommonFields{
    image: string;
    productId: number;
}
export interface IImage{
    image: string;
    productId: number;
}

@Entity('images', { database: config.DATABASE_NAME })
export class ImageEntity extends CommonFieldsEntity implements IImageExtends {
    @Column({
        type: 'varchar',
        width: 250,
    })
        image: string;

    @Column({
        type: 'int',
    })
        productId: number;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.images,
        { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
    )
    @JoinColumn({ name: 'productId' })
        product: ProductEntity;

    @ManyToOne(
        () => TextileEntity,
        (textile) => textile.images,
        { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
    )
    @JoinColumn({ name: 'productId' })
        textile: TextileEntity;
}
