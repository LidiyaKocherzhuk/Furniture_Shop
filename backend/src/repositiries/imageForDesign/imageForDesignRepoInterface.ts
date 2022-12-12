import { UpdateResult } from 'typeorm';

import { IImageForDesign, ImageForDesignEntity } from '../../entity';

export interface IImageForDesignRepo{
    getAll(): Promise<ImageForDesignEntity[]>;
    save(image: IImageForDesign): Promise<ImageForDesignEntity>;
    getByImage(imageName: string): Promise<ImageForDesignEntity | undefined>;
    getByParams(
        params: Partial<IImageForDesign>,
    ): Promise<ImageForDesignEntity[] | undefined>;
    update(id: number, data: Partial<ImageForDesignEntity>): Promise<UpdateResult>;
}
