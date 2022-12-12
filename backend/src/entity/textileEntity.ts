import {
    Column,
    Entity, JoinTable, OneToMany,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { TextileImagesEntity } from './textileImagesEntity';

export interface ITextile extends ICommonFields{
    productId?: number;
    manufacturer: string;
    textileName: string;
    types: string;
    numberOfShades?: string;
    antiClaw?: string;
    waterRepellent?: string;
    easyToCare?: string;
    durability?: string;
    anotherDetails?: string;
}

@Entity('textile', { database: config.DATABASE_NAME })
export class TextileEntity extends CommonFieldsEntity implements ITextile {
    @Column({
        type: 'int',
    })
        productId?: number;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        manufacturer: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        textileName: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        types: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        numberOfShades?: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        antiClaw?: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        waterRepellent?: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        easyToCare?: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        durability?: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        anotherDetails?: string;

    @OneToMany(
        () => TextileImagesEntity,
        (image) => image.textile,
    )
    @JoinTable()
        images: TextileImagesEntity[];
}
