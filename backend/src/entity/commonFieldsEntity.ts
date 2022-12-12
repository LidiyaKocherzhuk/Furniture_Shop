import {
    Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

import { config } from '../config';

export interface ICommonFields {
    id: number;
    createdAt: string;
    deletedAt?: string;
}

@Entity('beds', { database: config.DATABASE_NAME })
export class CommonFieldsEntity implements ICommonFields {
    @PrimaryGeneratedColumn()
        id:number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createdAt: string;

    @Column()
    @DeleteDateColumn({ type: 'timestamp' })
        deletedAt?: string;
}
