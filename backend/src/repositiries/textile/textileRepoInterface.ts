import { ITextile, TextileEntity } from '../../entity';

export interface ITextileRepo{
    getAll(): Promise<TextileEntity[]>;
    save(textile: ITextile): Promise<TextileEntity>;
    getByParams(params: Partial<ITextile>): Promise<TextileEntity | undefined>;
    update(id: number, params: Partial<ITextile>): Promise<void>;
    delete(id: number): Promise<void>;
}
