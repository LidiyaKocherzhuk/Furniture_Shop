import {
    Column, Entity, OneToMany,
} from 'typeorm';

import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { config } from '../config';
import { TokenEntity } from './tokenEntity';
import { BasketEntity } from './basketEntity';
import { IsLikeEntity } from './isLikeEntity';
import { MeetingEntity } from './meetingEntity';
import { CommentEntity } from './commentEntity';
import {OrderedEntity} from './orderedEntity';

export interface IUserExtends extends ICommonFields {
    username: string;
    surname?: string;
    email: string;
    password: string;
    phone?: string;
    age?: number;
    city?: string;
    image?: string;
    role: string;

}

export interface IUser{
    username: string;
    surname?: string;
    email: string;
    password: string;
    phone?: string;
    age?: number;
    city?: string;
    image?: string;
    role: string;

}

@Entity('users', { database: config.DATABASE_NAME })
export class UserEntity extends CommonFieldsEntity implements IUserExtends {
    @Column({
        type: 'varchar',
        width: 50,
        nullable: false,
    })
        username: string;

    @Column({
        type: 'varchar',
        width: 50,
    })
        surname?: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    })
        email: string;

    @Column({
        type: 'varchar',
        width: 50,
        nullable: false,
    })
        password: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        phone?: string;

    @Column({
        type: 'varchar',
    })
        age?: number;

    @Column({
        type: 'varchar',
        width: 250,
    })
        city?: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        image?: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        role: string;

    @OneToMany(() => TokenEntity, (token) => token.user)
        tokens: TokenEntity[];

    @OneToMany(() => BasketEntity, (basket) => basket.user)
        basket: BasketEntity[];

    @OneToMany(() => OrderedEntity, (ordered) => ordered.user)
        ordered: OrderedEntity[];

    @OneToMany(() => IsLikeEntity, (isLike) => isLike.user)
        likes: IsLikeEntity[];

    @OneToMany(() => MeetingEntity, (meeting) => meeting.user)
        meetings: MeetingEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.user)
        comments: CommentEntity[];
}
