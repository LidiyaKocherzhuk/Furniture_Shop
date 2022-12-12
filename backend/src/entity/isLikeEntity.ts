import {
    Column, Entity, JoinTable, ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { UserEntity } from './userEntity';

interface IIsLikeExtends extends ICommonFields {
    userId: number;
    productId: number;
    isLike: boolean;
}

export interface IIsLike {
    userId: number;
    productId: number;
    isLike: boolean;
}

@Entity('is_like', { database: config.DATABASE_NAME })
export class IsLikeEntity extends CommonFieldsEntity implements IIsLikeExtends {
    @Column({
        type: 'int',
        nullable: false,
    })

        userId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
        productId: number;

    @Column({
        type: 'boolean',
        default: true,
    })
        isLike: boolean;

    @ManyToOne(
        () => UserEntity,
        (user) => user.likes,
        { onDelete: 'CASCADE' },
    )
    @JoinTable({ name: 'userId' })
        user: UserEntity;
}
