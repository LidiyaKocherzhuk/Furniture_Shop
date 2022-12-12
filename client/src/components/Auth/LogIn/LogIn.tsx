import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { joiResolver } from '@hookform/resolvers/joi';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

import '../AuthStyle.css';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { logInUserThank } from '../../../store';
import { LoginValidator } from '../../../validators/loginValidator';
import { IUserGoogle } from '../../../interfaces';
import { ForgotPassword } from './ForgotPassword';

type Data = {
    email: string,
    password: string,
}

const LogIn: FC = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<Data>({
        resolver: joiResolver(LoginValidator),
        mode: 'onTouched',
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { loginError } = useAppSelector((state) => state.authReducer);
    const isAuth = localStorage.getItem('isAuth');

    function login(data: Data) {
        dispatch(logInUserThank(data));
    }

    useEffect(() => {
        if (loginError) {
            return;
        } if (!isAuth) {
            return;
        }
        navigate('/');
    }, [isAuth, loginError]);

    function handleCallbackResponse (response: CredentialResponse) {
        if (response.credential) {
            const userObject = jwtDecode(response.credential) as IUserGoogle;

            const password = response.credential.split('.')[0];
            console.log(userObject, password);
            login({ email: userObject.email, password })
        }
    }

    const forgotPassword = () => {
        const restoreElement = document.getElementsByClassName('forgot-password-bloc')[0] as HTMLElement;
        restoreElement.classList.toggle('forgot-password-bloc-show');
    }

    return (
        <div className={'authBloc'}>

            <h2>Вхід у кабінет</h2>

            {loginError && <h6>( Користувача не знайдено! )</h6>}
            <form onSubmit={handleSubmit(login)}>

                <label>Email<span>*</span>: <input type="text" {...register('email')}
                    placeholder={'ваш email'}/></label>
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <label>Пароль<span>*</span>: <input type="text" {...register('password')}
                    placeholder={'ваш пароль'}/></label>
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p>( <span>*</span> обов'язкові поля )</p>

                <button>Вхід</button>

            </form>

            <GoogleLogin
                onSuccess={credentialResponse => handleCallbackResponse(credentialResponse)}
                onError={() => {
                    console.log('Login Failed');
                }}
            />

            <label className={'to-register'}>Не зареєстровані? <NavLink to={'/registration'}>Реєстрація</NavLink></label>
            <label className={'forgot-password'}> Забули пароль? <span onClick={forgotPassword}>Відновити</span></label>

            <ForgotPassword/>
        </div>

    );
};

export { LogIn };
