import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { UserEntity } from './userEntity';

interface ITokenExtends extends ICommonFields {
    accessToken?: string;
    refreshToken?: string;
    actionToken?: string;
    userId: number;
    role: string;
}

export interface IToken {
    accessToken?: string;
    refreshToken?: string;
    actionToken?: string;
    userId: number;
    role: string;
}

@Entity('tokens', { database: config.DATABASE_NAME })
export class TokenEntity extends CommonFieldsEntity implements ITokenExtends {
    @Column({
        type: 'varchar',
        width: 250,
        unique: true,
    })
        accessToken?: string;

    @Column({
        type: 'varchar',
        width: 250,
        unique: true,
    })
        refreshToken?: string;

    @Column({
        type: 'varchar',
        width: 250,
        unique: true,
    })
        actionToken?: string;

    @Column({
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
        role: string;

    @ManyToOne(
        () => UserEntity,
        (user) => user.tokens,
        { onDelete: 'CASCADE' },
    )
    @JoinColumn({ name: 'userId' })
        user: UserEntity;
}
