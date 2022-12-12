import {
    Column, Entity,
} from 'typeorm';

import { config } from '../config';
import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';

interface IMadeOfExtends extends ICommonFields{
    material: string;
}
export interface IMadeOf{
    material: string;
}

@Entity('made_of', { database: config.DATABASE_NAME })
export class MadeOfEntity extends CommonFieldsEntity implements IMadeOfExtends {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        material: string;
}
