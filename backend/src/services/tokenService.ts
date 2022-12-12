import jwt from 'jsonwebtoken';

import { ITokenPair, IUserPayload } from '../intefaces';
import { config } from '../config';
import { tokenRepository } from '../repositiries';
import { IToken, TokenEntity } from '../entity';
import { ErrorHandler } from '../error/errorHandler';

class TokenService {
    async generateTokenPair(payload: IUserPayload): Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.ACCESS_TOKEN_KEY as string,
            { expiresIn: config.EXPIRES_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.REFRESH_TOKEN_KEY as string,
            { expiresIn: config.EXPIRES_REFRESH },
        );
        await this.saveToken({
            accessToken,
            refreshToken,
            userId: payload.id,
            role: payload.role,
        });

        return {
            userId: payload.id,
            role: payload.role,
            accessToken,
            refreshToken,
        };
    }
    //
    // generateActionToken(payload: IUserPayload) {
    //
    // }

    saveToken(token: ITokenPair): Promise<TokenEntity> {
        const {
            accessToken,
            refreshToken,
            userId,
            role,
        } = token;
        return tokenRepository.save({
            accessToken,
            refreshToken,
            userId,
            role,
        });
    }

    async verifyToken(token: string, type: string): Promise<IUserPayload> {
        try {
            let secretKey = config.ACCESS_TOKEN_KEY;

            if (type === 'refresh') {
                secretKey = config.REFRESH_TOKEN_KEY;
            }

            return jwt.verify(
                token,
                secretKey as string,
            ) as IUserPayload;
        } catch (e: any) {
            throw new ErrorHandler(e.message, 404);
        }
    }

    async deleteTokenByParams(params: Partial<IToken>): Promise<void> {
        await tokenRepository.deleteByParams(params);
    }
}

export const tokenService = new TokenService();
