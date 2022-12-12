import { IComment } from '../entity';
import { ErrorHandler } from '../error/errorHandler';
import { commentsRepository, userRepository } from '../repositiries';

class SocketCommentController {
    async getById(socket: any, data: Partial<IComment>) {
        const comments = await commentsRepository.getById(data);
        socket.emit('comments_by_productId', comments);
    }

    async saveMessages(io: any, data: any) {
        try {
            const { productId, userId } = data;

            await commentsRepository.save(data);
            const comments = await commentsRepository.getById({ productId });
            const userWithNewComments = await userRepository.getById(userId);

            io.emit('return_comments', { comments, userWithNewComments });
        } catch (e: any) {
            // eslint-disable-next-line no-new
            new ErrorHandler(e.message, 400);
        }
    }

    async delete(io: any, data: {id: number, productId: number }) {
        try {
            const { id, productId } = data;

            await commentsRepository.delete(id);
            const comments = await commentsRepository.getById({ productId });
            const userWithNewComments = await userRepository.getById(comments[0].userId);

            io.emit('return_update-comments', { comments, userWithNewComments });
        } catch (e: any) {
            // eslint-disable-next-line no-new
            new ErrorHandler(e.message, 400);
        }
    }
}

export const socketCommentController = new SocketCommentController();
