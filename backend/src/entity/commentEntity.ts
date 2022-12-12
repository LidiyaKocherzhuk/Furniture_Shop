import {
    Column,
    Entity,
    JoinTable,
    ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { UserEntity } from './userEntity';

export interface ICommentExtends extends ICommonFields {
    userId: number;
    message: string;
    username: string;
    surname: string;
    image: string;
    productId: number;
    product_model: string;
    product_type: string;
    product_image: string;
}

export interface IComment {
    userId: number;
    message: string;
    username: string;
    surname: string;
    image: string;
    productId: number;
    product_model: string;
    product_type: string;
    product_image: string;
}

@Entity('comment', { database: config.DATABASE_NAME })
export class CommentEntity extends CommonFieldsEntity implements ICommentExtends {
    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
        message: string;

    @Column({
        type: 'varchar',
        width: 50,
        nullable: false,
    })
        username: string;

    @Column({
        type: 'varchar',
        width: 50,
        nullable: true,
    })
        surname: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: true,
    })
        image: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        productId: number;

    @Column({
        type: 'varchar',
        width: 50,
        nullable: false,
    })
        product_model: string;

    @Column({
        type: 'varchar',
        width: 50,
        nullable: true,
    })
        product_type: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: true,
    })
        product_image: string;

    @ManyToOne(
        () => UserEntity,
        (user) => user.comments,
        { onDelete: 'CASCADE' },
    )
    @JoinTable({ name: 'userId' })
        user: UserEntity;
}
