import React, { FC, useEffect, useState } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';

import './MeetingBloc.css';
import { meetingService } from '../../../services';
import { IUserFromStorage2 } from '../../../interfaces';

interface Props {
    productId: number;
}

const MeetingBloc: FC<Props> = ({ productId }) => {
    const userFromStorage = localStorage.getItem('isAuth');
    const [userData, setUserData] = useState<IUserFromStorage2>({
        id: 0,
        email: '',
        surname: '',
        username: '',
    });

    const {
        id, username, surname, email,
    } = userData;

    const { handleSubmit, register } = useForm();
    const [warning, setWarning] = useState(true);

    useEffect(() => {
        window.scroll(0, 0);
        if (userFromStorage) {
            const {
                id, username, surname, email,
            } = JSON.parse(userFromStorage);
            setUserData({
                id, username, surname, email,
            });
        }
    }, []);

    const getMeetingMessage = (data: any) => {
        const meetingBloc = document.getElementsByClassName('meetingBloc')[0];
        meetingBloc.classList.toggle('meetingBlocShow');

        meetingService.save({
            ...data,
            productId,
            userId: id,
            userName: username,
            userSurname: surname,
            userEmail: email,
            isViewed: false,
        }).then();
    };

    return (
        <div className={'meetingBloc'}>

            {warning

                ? <div className={'warning'}>
                    <h5>
                        Шановний клієнт!
                        <br/>
                        Адміністрація Soft.Life.Lviv
                        бажає Вам гарного та продуктивного дня.
                        Також хочемо застерегти Вас, не передавати кошти
                        незнайомим людям та бути обережними при зустрічі з ними.
                        <br/>
                        Вдалих покупок.
                        <br/>
                        З повагою Ваші Soft.Life.Lviv <BsFillHeartFill/>
                    </h5>
                    <button onClick={() => setWarning(false)}>Ok</button>
                </div>

                : <div className={'meetingMessage'}>

                    <h5>Вітаємо у Soft.Life.Lviv!</h5>
                    <h6>Напишіть будь ласка бажаний день та час зустрічі а також номер телефону
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        і ми якнайшвидше з'яжимось з Вами.</h6>

                    <form onSubmit={handleSubmit(getMeetingMessage)}>
                        <input type="number" {...register('userPhone')} placeholder={'телефон'}/>
                        <input type="text" {...register('meetingMessage')} placeholder={'дата та час'}/>
                        <button>Відправити</button>
                    </form>

                </div>
            }

        </div>
    );
};

export { MeetingBloc };
