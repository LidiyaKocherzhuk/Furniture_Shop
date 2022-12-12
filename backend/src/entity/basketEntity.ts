import {
    Column,
    Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { UserEntity } from './userEntity';
import { ProductEntity } from './productEntity';

interface IBasketExtends extends ICommonFields {
    userId: number;
    productId: number;
    productCount: number;
    productCountPrice: number;

}

export interface IBasket {
    userId: number;
    productId: number;
    productCount:number;
    productCountPrice:number;

}

@Entity('basket', { database: config.DATABASE_NAME })
export class BasketEntity extends CommonFieldsEntity implements IBasketExtends {
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
        (user) => user.basket,
        { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'userId' })
        user: UserEntity;

    @ManyToOne(
        () => ProductEntity,
        (product) => product.basket,
        { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
    )
    @JoinColumn({ name: 'productId' })
        product: ProductEntity;
}
