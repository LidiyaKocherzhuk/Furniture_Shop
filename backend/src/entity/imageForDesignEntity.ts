import { Column, Entity } from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';

interface IImageForDesignExtends extends ICommonFields {
    image: string;
    location?: string;
    description?: string;
}

export interface IImageForDesign {
    image: string;
    location?: string;
    description?: string;
}

@Entity('images_for_design', { database: config.DATABASE_NAME })
export class ImageForDesignEntity extends CommonFieldsEntity implements IImageForDesignExtends {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        image: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        location?: string;

    @Column({
        type: 'varchar',
        width: 2500,
    })
        description?: string;
}
