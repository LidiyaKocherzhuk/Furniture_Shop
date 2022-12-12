import { getManager } from 'typeorm';

import { CommentEntity, IComment, ICommentExtends } from '../../entity/commentEntity';

class CommentsRepository {
    async save(data: IComment): Promise<CommentEntity> {
        return getManager()
            .getRepository(CommentEntity)
            .save(data);
    }

    async getAll(): Promise<CommentEntity[]> {
        return getManager()
            .getRepository(CommentEntity)
            .find();
    }

    async getById(productId: Partial<ICommentExtends>): Promise<CommentEntity[]> {
        return getManager()
            .getRepository(CommentEntity)
            .find(productId);
    }

    async delete(id: number): Promise<void> {
        await getManager()
            .getRepository(CommentEntity)
            .delete(id);
    }
}

export const commentsRepository = new CommentsRepository();
