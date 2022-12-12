import { IImage, ImageEntity } from '../../entity';

export interface IImageRepo{
    getAll(): Promise<ImageEntity[]>;
    save(image: IImage): Promise<ImageEntity>;
    deleteById(id:number): Promise<void>;
}
