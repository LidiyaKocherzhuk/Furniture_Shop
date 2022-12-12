import { getManager } from 'typeorm';

import { IImage, ImageEntity } from '../../entity';
import { IImageRepo } from './imageRepoInterface';

class ImageRepository implements IImageRepo {
    getAll(): Promise<ImageEntity[]> {
        return getManager().getRepository(ImageEntity).find();
    }

    save(image: IImage): Promise<ImageEntity> {
        return getManager().getRepository(ImageEntity).save(image);
    }

    async deleteById(id:number): Promise<void> {
        await getManager().getRepository(ImageEntity).delete({ id });
    }
}

export const imageRepository = new ImageRepository();
