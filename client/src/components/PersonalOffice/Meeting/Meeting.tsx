import React, { FC, useEffect, useState } from 'react';

import './Meeting.css';
import { IMeetingExtends, IUserExtends } from '../../../interfaces';
import { meetingService } from '../../../services';

const Meeting: FC = () => {
    const role = localStorage.getItem('role');
    const userFromStorage = localStorage.getItem('isAuth');
    const [meetings, setMeetings] = useState<IMeetingExtends[]>([]);

    useEffect(() => {
        if (role === 'superUser') {
            meetingService.getAll().then((value) => setMeetings(value.data));
        }
        if (userFromStorage) {
            const { meetings } = JSON.parse(userFromStorage) as IUserExtends;
            setMeetings(meetings);
        }
    }, []);

    return (
        <div className={'meetings'}>
            <h2>Список зустрічей</h2>
            <hr/>

            {meetings.length ? meetings.map((meeting) => <div key={meeting.id} className={'one-meeting'}>

                { role === 'superUser'
                    ? <div>
                        <h5>Вам пропонують зустріч на {meeting.meetingMessage}!</h5>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <h6>Зв'яжіться з замовником для підтвердження.</h6>
                    </div>
                    : <div>
                        <h5>Ви запланували зустріч на {meeting.meetingMessage}!</h5>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <h6>Ми зв'яжимось з вами для підтвердження.</h6>
                    </div>
                }

                <hr/>
                <p>Бажаємо хорошого та продуктивного дня. <br/>
                        З повагою Soft.Life.Lviv!</p>

            </div>)
                : <h5>У вас ще немає запланованих зустрічей!</h5>

            }

        </div>
    );
};

export { Meeting };
