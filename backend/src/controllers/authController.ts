import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { authService, tokenService, emailService } from '../services';
import { ErrorHandler } from '../error/errorHandler';
import { EmailActionEnum } from '../config/enums';
import { config } from '../config';
import { userRepository } from '../repositiries';

class AuthController {
    async registration(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userBody, role, image } = req;
            if (userBody && role) {
                const { email } = userBody;

                console.log(email);
                await emailService.sendMail(
                    email,
                    EmailActionEnum.CONFIRM,
                    { email, confirmCode: config.CONFIRM_CODE },
                );

                const tokenData = await authService.registration(
                    userBody,
                    role,
                    image,
                );

                if (!tokenData) {
                    next(new ErrorHandler('User not found', 404));
                }

                console.log(config.CONFIRM_CODE);
                res.status(201)
                    .json({ ...tokenData, confirmCode: config.CONFIRM_CODE });
                return;
            }
            next(new ErrorHandler('User not found', 404));
        } catch (e) {
            next(e);
        }
    }

    async logIn(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.user && req.role) {
                const {
                    id,
                    email,
                } = req.user;

                const tokenPair = await tokenService.generateTokenPair({
                    id,
                    email,
                    role: req.role,
                });

                res.status(201)
                    .json({
                        ...tokenPair,
                        user: req.user,
                    });
                next();
                return;
            }

            next(new ErrorHandler('User for logIn does not exists!', 404));
        } catch (e) {
            next(e);
        }
    }

    async logOut(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await tokenService.deleteTokenByParams({ userId: Number(id) });

            res.status(200);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.user && req.role) {
                const { refreshToken } = req.body;
                const {
                    id,
                    email,
                } = req.user;

                await tokenService.deleteTokenByParams({ refreshToken });
                const tokenPair = await tokenService.generateTokenPair({
                    id,
                    email,
                    role: req.role,
                });

                res.status(201)
                    .json({
                        ...tokenPair,
                        user: req.user,
                    });

                next();
                return;
            }

            next(new ErrorHandler('User for refresh does not exists!', 404));
        } catch (e) {
            next(e);
        }
    }

    async forgotPassController(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;

            const user = await userRepository.getByParams({ email });

            if (user) {
                await emailService.sendMail(
                    email,
                    EmailActionEnum.CONFIRM,
                    { email, confirmCode: config.CONFIRM_CODE },
                );

                console.log(config.CONFIRM_CODE);
                res.status(201)
                    .json({ user, confirmCode: config.CONFIRM_CODE });
                return;
            }

            next(new ErrorHandler('User with this email does not exists!', 404));
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
