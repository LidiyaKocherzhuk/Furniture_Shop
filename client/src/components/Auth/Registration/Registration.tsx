import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

import './Registration.css';
import '../AuthStyle.css';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { registrationUserThank } from '../../../store';
import { UserValidator } from '../../../validators/userValidator';
import { IUser, IUserGoogle } from '../../../interfaces';

const Registration: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(UserValidator),
        mode: 'onTouched',
    });

    const { registerPending, registerError } = useAppSelector(state => state.authReducer);
    const isAuth = localStorage.getItem('accessToken');

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const saveUser = () => {
        const userForm = document.getElementById('userForm') as HTMLFormElement;
        const form = new FormData(userForm);
        form.delete('confirmPassword');

        const keys = [];
        for (const [key, value] of form.entries()) {
            if (!value || value == '') {
                keys.push(key);
            }
        }
        for (const key of keys) {
            form.delete(key);
        }

        dispatch(registrationUserThank(form));
    };

    const saveUserWithGoogle = (userData: IUser) =>{
        const form = new FormData();

        for (const [key, value] of Object.entries(userData)) {
            if (value) {
                form.set(`${key}`, value);
            }

        }

        dispatch(registrationUserThank(form));
    }

    function handleCallbackResponse (response: CredentialResponse) {
        if (response.credential) {
            const userObject = jwtDecode(response.credential) as IUserGoogle;
            const { family_name, given_name, email, picture } = userObject;
            console.log(userObject);

            const password = response.credential.split('.')[0];
            console.log(password.length);

            saveUserWithGoogle({
                email,
                password,
                username: given_name,
                surname: family_name,
                image: picture,
            })
        }
    }

    useEffect(() => {

        if (registerError) {
            return;
        } else if (!isAuth) {
            return;
        }
        navigate('/confirmEmail');
    }, [registerError, isAuth]);

    return (
        <>
            {registerPending
                ? <div className={'spinner'}>
                    <div className={'spinner-grow'} role="status">
                        <span className={'visually-hidden'}>Loading...</span>
                    </div>
                </div>
                : <div className={'registration authBloc'}>

                    <h2>Реєстрація</h2>

                    {registerError.includes('email') && <h6>( Користувач з таким емейлом вже зареєстрований! )</h6>}
                    {registerError.includes('phone') && <h6>( Користувач з таким номером вже зареєстрований! )</h6>}

                    <form
                        onSubmit={handleSubmit(saveUser)}
                        id={'userForm'}
                    >
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <label>Ім'я<span>*</span>: <input type="text" {...register('username')}
                            placeholder={'ваше ім\'я'}/></label>
                        <ErrorMessage
                            errors={errors}
                            name="username"
                            render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                        />

                        <label>Прізвище: <input type="text" {...register('surname')}
                            placeholder={'ваше прізвище'}/></label>
                        <ErrorMessage
                            errors={errors}
                            name="surname"
                            render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                        />

                        <label>Email<span>*</span>:
                            <input type="email" {...register('email')}
                                placeholder={'ваш email@gmail.com'}
                                className={registerError.includes('email') ? 'error' : undefined}/>
                        </label>
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                        />

                        <label>Пароль<span>*</span>: <input type="password" {...register('password')}
                            placeholder={'придумайте пароль'}/></label>
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                        />

                        <label>Повторіть пароль<span>*</span>: <input type="password" {...register('confirmPassword')}
                            placeholder={'повторіть пароль'}/></label>
                        <ErrorMessage
                            errors={errors}
                            name="confirmPassword"
                            render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                        />

                        <label>Номер: <input type="text" {...register('phone')}
                            placeholder={'ваш номер'}
                            className={registerError.includes('phone') ? 'error' : undefined}/></label>
                        <ErrorMessage
                            errors={errors}
                            name="phone"
                            render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                        />

                        <label>Вік: <input type="number" {...register('age')}
                            placeholder={'ваш вік'}/></label>
                        <ErrorMessage
                            errors={errors}
                            name="age"
                            render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                        />

                        <label>Місто: <input type="text" {...register('city')}
                            placeholder={'ваше місто'}/></label>
                        <ErrorMessage
                            errors={errors}
                            name="city"
                            render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                        />

                        <label>Виберіть фото: <input type="file" {...register('files')}/></label>
                        <ErrorMessage
                            errors={errors}
                            name="files"
                            render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                        />

                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p>( <span>*</span> обов'язкові поля )</p>

                        <button>Реєстрація</button>

                    </form>

                    <GoogleLogin
                        onSuccess={credentialResponse => handleCallbackResponse(credentialResponse)}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        text={'signup_with'}
                    />
                </div>
            }
        </>

    );
};

export { Registration };
