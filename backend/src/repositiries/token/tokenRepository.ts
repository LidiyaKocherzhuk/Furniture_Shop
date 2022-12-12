import { getManager } from 'typeorm';

import { ITokenPair } from '../../intefaces';
import { IToken, TokenEntity } from '../../entity';
import { ITokenRepo } from './tokenRepoInterface';

class TokenRepository implements ITokenRepo {
    save(tokenPair: ITokenPair): Promise<TokenEntity> {
        return getManager()
            .getRepository(TokenEntity)
            .save(tokenPair);
    }

    getByParams(params: Partial<IToken>): Promise<TokenEntity | undefined> {
        return getManager()
            .getRepository(TokenEntity)
            .findOne(params);
    }

    async deleteByParams(params: Partial<IToken>): Promise<void> {
        await getManager().getRepository(TokenEntity).softDelete(params);
    }
}

export const tokenRepository = new TokenRepository();
