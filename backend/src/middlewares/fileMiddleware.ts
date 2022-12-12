import { Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';

import { IRequest } from '../intefaces';
import { fileConstants } from '../constants';
import { ErrorHandler } from '../error/errorHandler';

class FileMiddleware {
    async checkFile(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.files) {
                const { image } = req.files;

                let imageArr = [];

                if (Array.isArray(image)) {
                    for (const item of image as UploadedFile[]) {
                        const {
                            mimetype,
                            size,
                        } = item;

                        if (!fileConstants
                            .PHOTOS_MIMETYPE
                            .includes(mimetype) && size > fileConstants.PHOTO_MAX_SIZE
                        ) {
                            next(new ErrorHandler('Wrong file format or size is too big!!!'));
                            return;
                        }
                        if (fileConstants
                            .PHOTOS_MIMETYPE
                            .includes(mimetype) && size < fileConstants.PHOTO_MAX_SIZE) {
                            imageArr.push(item);
                        }
                    }
                } else if (typeof image === 'object') {
                    const {
                        mimetype,
                        size,
                    } = image as UploadedFile;

                    if (!fileConstants
                        .PHOTOS_MIMETYPE
                        .includes(mimetype) && size > fileConstants.PHOTO_MAX_SIZE
                    ) {
                        next(new ErrorHandler('Wrong file format or size is too big!!!'));
                        return;
                    }
                    if (fileConstants
                        .PHOTOS_MIMETYPE
                        .includes(mimetype) && size < fileConstants.PHOTO_MAX_SIZE) {
                        imageArr.push(image as UploadedFile);
                    }
                }

                req.image = imageArr;
                imageArr = [];
                next();
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const fileMiddleware = new FileMiddleware();
