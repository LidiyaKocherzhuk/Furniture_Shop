import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { joiResolver } from '@hookform/resolvers/joi';

import './ConfirmEmail.css';
import { useAppSelector } from '../../../hooks';
import { ConfirmEmailValidator } from '../../../validators/confirmEmailValidator';

type Data = {
    emailCode: number;
}

interface IProps {
    isForgot?: boolean;
}

const ConfirmEmail: FC<IProps> = ({ isForgot= false }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Data | any>({
        resolver: joiResolver(ConfirmEmailValidator),
        mode: 'onTouched',
    });

    const {
        confirmEmailCode,
        isAuth,
    } = useAppSelector((state) => state.authReducer);

    const navigate = useNavigate();
    const [equal, setEqual] = useState('');

    const comparisonEmailCode = (data: Data) => {
        console.log(confirmEmailCode);

        if (confirmEmailCode) {
            if (data.emailCode !== confirmEmailCode) {
                setEqual('Не вірний код спробуйте ще!');
            }
            if (isForgot) {
                const confirmElement = document.getElementsByClassName('give-confirm-code')[0] as HTMLElement;
                confirmElement.classList.toggle('give-confirm-code-show');
                const newPasswordElement = document.getElementsByClassName('give-new-password')[0] as HTMLElement;
                newPasswordElement.classList.toggle('give-new-password-show');
            }
            if (isAuth) {
                localStorage.setItem('isAuth', String(isAuth));
                navigate('/');
            }
        }
    };

    return (

        <div className={'confirmEmail'}>
            <div className={'content'}>
                <h3>Вам відправлено код на імейл!</h3>
                <h4>
                    Для завершення реєстрації введіть код та натисніть продовжити!

                    <form onSubmit={handleSubmit(comparisonEmailCode)}>

                        <label>Ваш код:
                            <input
                                type="number"
                                {...register('emailCode')}
                                placeholder={'654879'}
                            />
                        </label>
                        <ErrorMessage
                            errors={errors}
                            name="emailCode"
                            render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                        />
                        {equal ? <span>{equal}</span> : null}

                        <button>Продовжити</button>

                    </form>

                </h4>
            </div>
        </div>

    );
};

export { ConfirmEmail };
