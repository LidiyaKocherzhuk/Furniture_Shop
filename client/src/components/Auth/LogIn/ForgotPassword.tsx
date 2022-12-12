import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';

import './ForgotPassword.css';
import { ConfirmEmail } from '../confirmEmail/ConfirmEmail';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { restorePasswordThank, updatePasswordThank, /*updatePasswordThank*/ } from '../../../store';
import { forgotPasswordValidator } from '../../../validators/loginValidator';

type Data = {
    email: string,
    password: string,
    confirmPassword: string,
}

const ForgotPassword: FC = () => {

    const { user, confirmEmailCode, error, restorePending } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    const { register, getValues, formState: { errors } } = useForm<Data>({
        resolver: joiResolver(forgotPasswordValidator),
        mode: 'onTouched',
    })

    useEffect(() => {
        const restoreElement = document.getElementsByClassName('give-email')[0] as HTMLElement;
        restoreElement.classList.toggle('give-email-show');

        if (confirmEmailCode) {
            const confirmElement = document.getElementsByClassName('give-confirm-code')[0] as HTMLElement;
            confirmElement.classList.toggle('give-confirm-code-show');
        }

    },[confirmEmailCode])

    const sendEmailToRestore = (e: any) => {
        e.preventDefault();
        const email = getValues('email');
        console.log(getValues('email'));

        if (email) {
            dispatch(restorePasswordThank(email));
        }

    };

    console.log(confirmEmailCode);

    const restorePassword = (e: any) => {
        e.preventDefault();
        const password = getValues('password');

        if (user && password) {
            dispatch(updatePasswordThank({ id: user.id, password }));

            const newPasswordElement = document.getElementsByClassName('give-new-password')[0] as HTMLElement;
            newPasswordElement.classList.toggle('give-new-password-show');
            const restoreElement = document.getElementsByClassName('forgot-password-bloc')[0] as HTMLElement;
            restoreElement.classList.toggle('forgot-password-bloc-show');
        }
    };
    console.log(error);

    return (
        <div className={'forgot-password-bloc'}>
            <h4>Відновлення паролю</h4>

            {error && <div>
                <h6>(Користувач під таким емейлом ще не реєструвався)</h6>
                <Link to={'/registration'}>Зареєструватися</Link>
            </div>}

            <div className={'give-email'}>
                <form>

                    <label>Введіть email <input type="email"
                        {...register('email')}
                        placeholder={'lilomonika@gmail.com'}
                    /></label>
                    <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <button onClick={sendEmailToRestore}>Відправити</button>

                </form>
            </div>

            {
                restorePending
                && <div className={'spinner'}>
                    <div className={'spinner-grow'} role="status">
                        <span className={'visually-hidden'}>Loading...</span>
                    </div>
                </div>
            }

            <div className={'give-confirm-code'}>
                <ConfirmEmail isForgot={true}/>
            </div>

            <div className={'give-new-password'}>
                <form>

                    <label>Новий пароль: <input type="password"
                        {...register('password')}
                        placeholder={'Gs4lr4L'}
                    /></label>
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <label>Повторіть пароль<span>*</span>: <input type="password"
                        {...register('confirmPassword')}
                        placeholder={'Gs4lr4L'}
                    /></label>
                    <ErrorMessage
                        errors={errors}
                        name="confirmPassword"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <button onClick={restorePassword}>Зберегти</button>

                </form>
            </div>

        </div>
    );
};

export { ForgotPassword };
