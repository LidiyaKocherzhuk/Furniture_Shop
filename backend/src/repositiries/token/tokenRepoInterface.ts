import { ITokenPair } from '../../intefaces';
import { IToken, TokenEntity } from '../../entity';

export interface ITokenRepo{
    save(tokenPair: ITokenPair): Promise<TokenEntity>;
    getByParams(params: Partial<IToken>): Promise<TokenEntity | undefined>;
    deleteByParams(params: Partial<IToken>): Promise<void>;
}
