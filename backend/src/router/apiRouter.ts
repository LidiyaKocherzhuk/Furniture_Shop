import { Router } from 'express';

import { authRouter } from './authRouter';
import { imagesForDesignRouter } from './iImagesForDesignRouter';
import { usersRouter } from './usersRouter';
import { priceRouter } from './priceRouter';
import { textileRouter } from './textileRouter';
import { productTextileRouter } from './productTextileRouter';
import { madeOfRouter } from './madeOfRouter';
import { basketRouter } from './basketRouter';
import { productsRouter } from './productsRouter';
import { isLikeRouter } from './isLikeRouter';
import { meetingRouter } from './meetingRouter';
import { imageRouter } from './imageRouter';
import { textileImagesRouter } from './textileImagesRouter';
import { orderedRouter } from './orderedRouter';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/productImages', imageRouter);
apiRouter.use('/images', imagesForDesignRouter);
apiRouter.use('/bedPrice', priceRouter);
apiRouter.use('/textile', textileRouter);
apiRouter.use('/textileImages', textileImagesRouter);
apiRouter.use('/productTextile', productTextileRouter);
apiRouter.use('/madeOf', madeOfRouter);
apiRouter.use('/basket', basketRouter);
apiRouter.use('/ordered', orderedRouter);
apiRouter.use('/isLike', isLikeRouter);
apiRouter.use('/meeting', meetingRouter);
