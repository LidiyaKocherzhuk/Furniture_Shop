import {
    Column,
    Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { UserEntity } from './userEntity';
import { ProductEntity } from './productEntity';

interface IOrderedExtends extends ICommonFields {
    userId: number;
    productId: number;
    productCount: number;
    productCountPrice: number;

}

export interface IOrdered {
    userId: number;
    productId: number;
    productCount:number;
    productCountPrice:number;

}

@Entity('ordered', { database: config.DATABASE_NAME })
export class OrderedEntity extends CommonFieldsEntity implements IOrderedExtends {
    @Column({
        type: 'int',
        nullable: false,
    })
        productId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'int',
        default: 1,
        nullable: false,
    })
        productCount:number;

    @Column({
        type: 'int',
        nullable: false,
    })
        productCountPrice:number;

    @ManyToOne(
        () => UserEntity,
        (user) => user.ordered,
        { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'userId' })
        user: UserEntity;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.ordered,
        { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
    )
    @JoinColumn({ name: 'productId' })
        product: ProductEntity;
}
