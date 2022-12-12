import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { ProductEntity } from './productEntity';

export interface IBedPrice extends ICommonFields {
    size140_200?: string;
    size160_200?: string;
    size180_200?: string;
    size200_200?: string;
    bedId: number;
}

@Entity('price', { database: config.DATABASE_NAME })
export class BedPriceEntity extends CommonFieldsEntity implements IBedPrice {
    @Column({
        type: 'varchar',
    })
        size140_200?: string;

    @Column({
        type: 'varchar',
    })
        size160_200?: string;

    @Column({
        type: 'varchar',
    })
        size180_200?: string;

    @Column({
        type: 'varchar',
    })
        size200_200?: string;

    @Column({
        type: 'int',
    })
        bedId: number;

    @OneToOne(
        () => ProductEntity,
        (user) => user.priceForAnotherSize,
        { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
    )
    @JoinColumn({ name: 'bedId' })
        product: ProductEntity;
}
