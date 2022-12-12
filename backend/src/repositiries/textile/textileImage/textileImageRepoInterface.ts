import { ITextileImages, TextileImagesEntity } from '../../../entity';

export interface ITextileImageRepo{
    save(image: ITextileImages): Promise<TextileImagesEntity>,
    deleteById(id:number): Promise<void>,
}
