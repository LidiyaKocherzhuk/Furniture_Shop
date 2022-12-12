import React, { FC, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiList } from 'react-icons/fi';
import { TiHeartOutline } from 'react-icons/ti';
import { TbMessageCircle, TbMug } from 'react-icons/tb';

import './User.css';

const User: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('ordered');
    }, []);

    return (

        <div className={'user-links'}>
            <div className={'user-link'}>
                <span><FiList className={'user-icons'}/></span>
                <NavLink to='ordered'>Мої замовлення</NavLink>
            </div>

            <div className={'user-link'}>
                <span><TiHeartOutline className={'user-icons'}/></span>
                <NavLink to='myLike'> Список бажань</NavLink>
            </div>

            <div className={'user-link'}>
                <span><TbMessageCircle className={'user-icons'}/></span>
                <NavLink to='comments'> Мої відгуки</NavLink>
            </div>

            <div className={'user-link'}>
                <span><TbMug className={'user-icons'}/></span>
                <NavLink to='meeting'> Мої зустрічі</NavLink>
            </div>
        </div>

    );
};

export { User };
