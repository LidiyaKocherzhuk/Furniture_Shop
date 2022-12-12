import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { config } from '../config';
import { TextileEntity } from './textileEntity';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';

interface ITextileImagesExtends extends ICommonFields {
    image: string;
    textileId: number;
}

export interface ITextileImages{
    image: string;
    textileId: number;
}

@Entity('textile_images', { database: config.DATABASE_NAME })
export class TextileImagesEntity extends CommonFieldsEntity implements ITextileImagesExtends {
    @Column({
        type: 'varchar',
        width: 500,
    })
        image: string;

    @Column({
        type: 'int',
    })
        textileId: number;

    @ManyToOne(
        () => TextileEntity,
        (textile) => textile.images,
        { onDelete: 'CASCADE', onUpdate: 'RESTRICT' },
    )
    @JoinColumn({ name: 'textileId' })
        textile: TextileEntity;
}
