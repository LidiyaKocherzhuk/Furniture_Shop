import React, { FC, useEffect } from 'react';
import { FiList, FiPlus, FiUsers } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { TiHeartOutline } from 'react-icons/ti';
import { TbMessageCircle, TbMug } from 'react-icons/tb';

import './SuperUser.css';

const SuperUser:FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('newProduct');
    }, []);

    return (
        <div className={'user-links'}>
            <div className={'user-link'}>
                <span><FiPlus className={'user-icons'}/></span>
                <NavLink to='newProduct'>Додати новий товар</NavLink>
            </div>

            <div className={'user-link'}>
                <span><FiPlus className={'user-icons'}/></span>
                <NavLink to='newTextile'>Додати матеріал оббивки <br/> та каркасу</NavLink>
            </div>

            <div className={'user-link'}>
                <span><FiList className={'user-icons'}/></span>
                <NavLink to='ordered'>Мої замовлення</NavLink>
            </div>

            <div className={'user-link'}>
                <span><TiHeartOutline className={'user-icons'}/></span>
                <NavLink to='myLike'> Список бажань </NavLink>
            </div>

            <div className={'user-link'}>
                <span><TbMessageCircle className={'user-icons'}/></span>
                <NavLink to='comments'> Мої відгуки</NavLink>
            </div>

            <div className={'user-link'}>
                <span><TbMug className={'user-icons'}/></span>
                <NavLink to='meeting'> Мої зустрічі</NavLink>
            </div>

            <div className={'user-link'}>
                <span><FiUsers className={'user-icons'}/></span>
                <NavLink to='users'>Користувачі</NavLink>
            </div>

        </div>
    );
};

export { SuperUser };
