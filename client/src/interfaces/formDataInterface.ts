import { IProduct } from './productInterface';

export interface IFormData extends FormData{
    data: Partial<IProduct>
}
