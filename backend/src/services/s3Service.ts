import S3 from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFile } from 'express-fileupload';

import { config } from '../config';

class S3Service {
    Bucket;

    constructor() {
        this.Bucket = new S3({
            region: config.S3_REGION,
            accessKeyId: config.S3_ACCESS_KEY,
            secretAccessKey: config.S3_SECRET_KEY,
        });
    }

    async uploadFile(
        file: UploadedFile,
        type: string,
        productId: number | string,
    ): Promise<string> {
        const imagePath = await S3Service.createPath(file.name, type, productId);

        const upload = await this.Bucket.upload({
            Bucket: config.S3_NAME as string,
            Body: file.data,
            Key: imagePath,
            ContentType: file.mimetype,
            ACL: 'public-read',
        }).promise();

        return upload.Location;
    }

    private static createPath(fileName: string, type: string, productId: number | string): string {
        const name = fileName.split(' ').join();
        return `${type}/${productId}/${uuidv4()}${name}`;
    }
}

export const s3Service = new S3Service();
