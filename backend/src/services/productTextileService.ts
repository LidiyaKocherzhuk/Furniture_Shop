import { productTextileRepository } from '../repositiries';
import { ITextileDataClient } from '../intefaces';

class ProductTextileService {
    async save(textileData: ITextileDataClient) {
        const {
            textiles,
            productId,
        } = textileData;

        for (const textile of textiles) {
            await productTextileRepository.save({ productId, textileId: textile });
        }
    }
}

export const productTextileService = new ProductTextileService();
