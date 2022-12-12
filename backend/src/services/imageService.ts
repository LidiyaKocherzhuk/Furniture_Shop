import { UploadedFile } from 'express-fileupload';

import { IRequest } from '../intefaces';
import { imageRepository, productRepository, textileImageRepository } from '../repositiries';
import { IProductExtends } from '../entity';
import { s3Service } from './s3Service';

class ImageService {
    async saveFile(
        image: UploadedFile[] | undefined,
        productId: number,
        productType: string,
    ) {
        if (image) {
            for (const item of image) {
                const imagePath = await s3Service.uploadFile(
                    item,
                    productType,
                    productId,
                );

                if (productType === 'textile') {
                    await textileImageRepository.save({ image: imagePath, textileId: productId });
                    console.log(imagePath, 'textile');
                } else {
                    await imageRepository.save({ image: imagePath, productId });
                    console.log(imagePath, 'product');
                }
            }
        }
    }

    async update(req: IRequest): Promise<IProductExtends[] | undefined> {
        const { image, params } = req;

        const productForUpdate = await productRepository.getById({ id: Number(params.id) });

        console.log(productForUpdate);
        if (!productForUpdate) {
            return undefined;
        }
        const { id, type } = productForUpdate;

        await this.saveFile(image, id, type);
        return productRepository.getAll(0);
    }
}

export const imageService = new ImageService();
