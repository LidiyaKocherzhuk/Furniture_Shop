import { NextFunction, Response } from 'express';

import { IRequest } from '../intefaces';
import { ErrorHandler } from '../error/errorHandler';
import { tokenService, userService } from '../services';
import { userRepository } from '../repositiries';
import { config } from '../config';
import { userValidator } from '../validators';

class AuthMiddleware {
    async checkRegistration(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.userBody) {
                const { email, phone } = req.userBody;
                const userFromDbByEmail = await userRepository.getByParams({ email });
                const userFromDbByPhone = await userRepository.getByParams({ phone });

                if (userFromDbByEmail) {
                    next(new ErrorHandler('User by this email already exists!', 403));
                    return;
                }

                if (userFromDbByPhone) {
                    next(new ErrorHandler('User by this phone already exists!', 403));
                    return;
                }

                if (email === config.SUPER_USER) {
                    req.role = 'superUser';
                    req.user = userFromDbByEmail;
                    next();
                    return;
                }
                console.log('checkRegistration');

                req.role = 'user';
                next();
                return;
            }
            next((new ErrorHandler('User not found', 404)));
        } catch (e) {
            next(e);
        }
    }

    async checkIsAuthorized(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const accessToken = req.get('authorization')?.split(' ')[1];

            if (!accessToken) {
                next(new ErrorHandler('Unauthorized!', 401));
                return;
            }

            const verifiedData = await tokenService.verifyToken(accessToken, 'access');

            if (!verifiedData.email) {
                next(new ErrorHandler('Access token does not have !', 401));
                return;
            }
            const userFromToken = await userRepository.getByParams({ email: verifiedData.email });

            if (!userFromToken) {
                next(new ErrorHandler('wrong token', 401));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    async checkLogin(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const userFromDb = await userRepository.getByParams({ email });

            if (!userFromDb) {
                next(new ErrorHandler('User does not exists!', 404));
                return;
            }
            const comparedPass = await userService.comparePassword(
                password,
                userFromDb.password,
            );

            if (!comparedPass) {
                next(new ErrorHandler('Wrong password or email!'));
                return;
            }

            if (email === config.SUPER_USER) {
                req.role = 'superUser';
                req.user = userFromDb;
                next();
                return;
            }

            req.role = 'user';
            req.user = userFromDb;
            next();
        } catch (e) {
            next(e);
        }
    }

    async checkRefresh(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                next(new ErrorHandler('Refresh token does not have !', 401));
                return;
            }

            const verifiedData = await tokenService.verifyToken(refreshToken, 'refresh');

            const userFromDb = await userRepository.getByParams({
                email: verifiedData.email,
            });

            if (!userFromDb) {
                next(new ErrorHandler('There is no user with such a token in the database', 401));
                return;
            }

            req.role = verifiedData.role;
            req.user = userFromDb;
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidRegistrationBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log('register', req.body);
            const { error, value } = userValidator.createUser.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            req.userBody = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidLoginBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = userValidator.loginUser.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message, 404));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidRefreshBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = userValidator.refreshUser.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message, 404));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    async isValidForgotBody(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error } = userValidator.forgotPassword.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message, 404));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
