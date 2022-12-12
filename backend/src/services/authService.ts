import { UploadedFile } from 'express-fileupload';

import { IUser } from '../entity';
import { userService } from './userService';
import { tokenService } from './tokenService';
import { ITokenData } from '../intefaces';
import { s3Service } from './s3Service';
import { userRepository } from '../repositiries';

class AuthService {
    async registration(
        userData: IUser,
        role: string,
        images: UploadedFile[] | undefined,
    ): Promise<ITokenData | undefined> {
        const createdUser = await userService.create({ ...userData, role });

        const { id, email } = createdUser;
        const tokenPair = await tokenService.generateTokenPair({ id, email, role });

        if (images) {
            const imageName = await s3Service.uploadFile(images[0], 'user', id);
            await userRepository.update({ image: imageName }, id);
        }
        const updateUser = await userRepository.getById(id);

        if (!updateUser) {
            return undefined;
        }

        return {
            ...tokenPair,
            user: updateUser,
        };
    }
}

export const authService = new AuthService();
