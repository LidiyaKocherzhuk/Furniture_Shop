import { getManager } from 'typeorm';

import { ITextileImageRepo } from './textileImageRepoInterface';
import { ITextileImages, TextileImagesEntity } from '../../../entity';

class TextileImageRepository implements ITextileImageRepo {
    save(image: ITextileImages): Promise<TextileImagesEntity> {
        return getManager().getRepository(TextileImagesEntity).save(image);
    }

    async deleteById(id:number): Promise<void> {
        await getManager().getRepository(TextileImagesEntity).delete({ id });
    }
}

export const textileImageRepository = new TextileImageRepository();
