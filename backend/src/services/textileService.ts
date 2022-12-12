import { IRequest } from '../intefaces';
import { textileRepository } from '../repositiries';
import { TextileEntity } from '../entity';
import { imageService } from './imageService';

class TextileService {
    async save(req: IRequest): Promise<TextileEntity[] | undefined> {
        const { textile, image } = req;

        if (textile) {
            const createdTextile = await textileRepository.save(textile);
            const { id } = createdTextile;

            if (image) {
                await imageService.saveFile(image, id, 'textile');
            }

            return textileRepository.getAll();
        }
        return undefined;
    }

    async update(req: IRequest): Promise<TextileEntity[] | undefined> {
        const { body, params } = req;
        const { id } = params;

        const textileFromDB = await textileRepository.getByParams({ id: Number(id) });

        if (textileFromDB) {
            await textileRepository.update(textileFromDB.id, body);
            return textileRepository.getAll();
        }
        return undefined;
    }
}

export const textileService = new TextileService();
