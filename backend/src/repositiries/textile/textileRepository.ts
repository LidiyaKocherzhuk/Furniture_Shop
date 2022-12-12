import { getManager } from 'typeorm';

import { ITextile, TextileEntity } from '../../entity';
import { ITextileRepo } from './textileRepoInterface';

class TextileRepository implements ITextileRepo {
    async getAll(): Promise<TextileEntity[]> {
        return getManager()
            .getRepository(TextileEntity)
            .find({ relations: ['images'] });
    }

    async save(textile: ITextile): Promise<TextileEntity> {
        return getManager()
            .getRepository(TextileEntity)
            .save(textile);
    }

    async getByParams(params: Partial<ITextile>): Promise<TextileEntity | undefined> {
        return getManager()
            .getRepository(TextileEntity)
            .findOne(params, { relations: ['images'] });
    }

    async update(id: number, params: Partial<ITextile>): Promise<void> {
        await getManager()
            .getRepository(TextileEntity)
            .update({ id }, params);
    }

    async delete(id: number): Promise<void> {
        await getManager()
            .getRepository(TextileEntity)
            .delete({ id });
    }
}

export const textileRepository = new TextileRepository();
