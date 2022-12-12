import { UploadedFile } from 'express-fileupload';

import { s3Service } from './s3Service';
import { imageForDesignRepository } from '../repositiries';
import { ImageForDesignEntity } from '../entity';
import { IRequest } from '../intefaces';

class ImageForDesignService {
    async saveImage(image: UploadedFile[], location: string, description: string): Promise<void> {
        for (const item of image) {
            const imagePath = await s3Service.uploadFile(item, 'imageForDesign', location);
            await imageForDesignRepository.save({
                image: imagePath,
                location,
                description,
            });
        }
    }

    async updateImage(
        req: IRequest,
    ): Promise<ImageForDesignEntity[] | undefined> {
        const { image, body } = req;
        const { id, location, description } = body;

        if (image?.length) {
            const imagePath = await s3Service.uploadFile(image[0], 'imageForDesign', location);

            if (description) {
                await imageForDesignRepository.update(id, { image: imagePath, description });
            } else {
                await imageForDesignRepository.update(id, { image: imagePath });
            }
        }

        if (!image?.length) {
            await imageForDesignRepository.update(id, { description });
        }

        return imageForDesignRepository.getByParams({ location: 'slides' });
    }
}

export const imageForDesignService = new ImageForDesignService();
