import { CommentEntity, IComment, ICommentExtends } from '../../entity';

export interface ICommentRepo {
    save(data: IComment): Promise<CommentEntity>;
    getAll(): Promise<CommentEntity[]>;
    getById(productId: Partial<ICommentExtends>): Promise<CommentEntity[]>;
    delete(id: number): Promise<void>;
}
