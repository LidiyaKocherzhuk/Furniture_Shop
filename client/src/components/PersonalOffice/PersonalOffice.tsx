import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import './PersonalOffice.css';
import { IUserExtends } from '../../interfaces';
import { SuperUser } from './SuperUser';
import { User } from './User';

const PersonalOffice:FC = () => {
    const role = localStorage.getItem('role');
    const user = localStorage.getItem('isAuth');
    const navigate = useNavigate();
    window.scroll(0, 0);

    let parsedUser = {} as IUserExtends;

    if (!user) {
        navigate('/login');
        return null;
    }

    parsedUser = JSON.parse(user) as IUserExtends;
    const {
        image,
        username,
        surname,
        email,
    } = parsedUser;

    return (
        <div id={'user-page'}>
            <div className={'left-bloc'}>
                <div className={'personal-info'}>

                    {image
                        ? <img src={image} alt="userAvatar" className={'avatar'}/>
                        : <img className={'avatar'}
                            src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                            alt="not image"/>
                    }

                    <div className={'u-describe'}>
                        <h6>{username} {surname}</h6>
                        <span>{email}</span>
                    </div>
                </div>

                {role === 'superUser'
                    ? <SuperUser/>
                    : <User/>
                }

                <hr/>

            </div>

            <div className={'right-bloc'}>
                <Outlet/>
            </div>

        </div>

    );
};

export { PersonalOffice };
