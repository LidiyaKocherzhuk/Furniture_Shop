import {
    Column, Entity, JoinTable, OneToMany,
} from 'typeorm';

import { CommonFieldsEntity, ICommonFields } from './commonFieldsEntity';
import { ProductTextileEntity } from './productTextileEntity';
import { ImageEntity } from './imageEntity';
import { BedPriceEntity } from './bedPriceEntity';
import { BasketEntity } from './basketEntity';
import { config } from '../config';
import { OrderedEntity } from './orderedEntity';

export interface IProductExtends extends ICommonFields {
    model: string;
    slats?: string;
    decor?: string;
    price: string;
    headboardHeight?: string;
    sidewallsHeight?: string;
    dimensionsOfTheProduct?: string;
    legs?: string;
    mechanism?: string;
    isNovelty?: string;
    isPopular?: string;
    anotherDetails?: string;
    type: string;
    materials?: string;
}

export interface IProduct {
    model: string;
    slats?: string;
    decor?: string;
    price: string;
    headboardHeight?: string;
    sidewallsHeight?: string;
    dimensionsOfTheProduct?: string;
    legs?: string;
    mechanism?: string;
    isNovelty?: string;
    isPopular?: string;
    anotherDetails?: string;
    type: string;
    materials?: string;
}

@Entity('products', { database: config.DATABASE_NAME })
export class ProductEntity extends CommonFieldsEntity implements IProductExtends {
    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        model: string;

    @Column({
        type: 'varchar',
        width: 250,
        default: 'фанера',
    })
        slats?: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        decor?: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: false,
    })
        price: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        headboardHeight?: string;

    @Column({
        type: 'varchar',
        width: 250,
    })
        sidewallsHeight?: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: true,
    })
        dimensionsOfTheProduct?: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: true,
    })
        legs?: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: true,
    })
        mechanism?: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: true,
    })
        isNovelty?: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: true,
    })
        isPopular?: string;

    @Column({
        type: 'varchar',
        width: 250,
        nullable: true,
    })
        anotherDetails?: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        type: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: true,
    })
        materials?: string;

    @OneToMany(
        () => ImageEntity,
        (image) => image.product,
    )
    @JoinTable()
        images: ImageEntity[];

    @OneToMany(
        () => BedPriceEntity,
        (price) => price.product,
    )
    @JoinTable()
        priceForAnotherSize: BedPriceEntity[];

    @OneToMany(
        () => ProductTextileEntity,
        (textile) => textile.product,
    )
    @JoinTable()
        textiles: ProductTextileEntity[];

    @OneToMany(
        () => BasketEntity,
        (basket) => basket.product,
    )
    @JoinTable()
        basket: BasketEntity[];

    @OneToMany(
        () => OrderedEntity,
        (ordered) => ordered.product,
    )
    @JoinTable()
        ordered: OrderedEntity[];
}
