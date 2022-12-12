import { getManager, UpdateResult } from 'typeorm';

import { IImageForDesign, ImageForDesignEntity } from '../../entity';
import { IImageForDesignRepo } from './imageForDesignRepoInterface';

class ImagesForDesignRepository implements IImageForDesignRepo {
    async getAll(): Promise<ImageForDesignEntity[]> {
        return getManager().getRepository(ImageForDesignEntity).find();
    }

    save(image: IImageForDesign): Promise<ImageForDesignEntity> {
        return getManager().getRepository(ImageForDesignEntity).save(image);
    }

    async getByImage(imageName: string): Promise<ImageForDesignEntity | undefined> {
        return getManager().getRepository(ImageForDesignEntity)
            .createQueryBuilder('images')
            .where('images.image LIKE :imageName', { imageName: `%${imageName}` })
            .getOne();
    }

    async getByParams(
        params: Partial<IImageForDesign>,
    ): Promise<ImageForDesignEntity[] | undefined> {
        return getManager().getRepository(ImageForDesignEntity)
            .createQueryBuilder('images')
            .where(params)
            .getMany();
    }

    async update(id: number, data: Partial<ImageForDesignEntity>): Promise<UpdateResult> {
        return getManager().getRepository(ImageForDesignEntity).update({ id }, data);
    }
}

export const imageForDesignRepository = new ImagesForDesignRepository();
