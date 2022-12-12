import React, { FC, useEffect, useState } from 'react';

import './Users.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getAllUsersThank } from '../../../../store';
import { OneUser } from './OneUser/OneUser';
import { Likes } from '../../Likes/Likes';
import { Basket } from '../../../Header/Basket/Basket';
import { Ordered } from '../../Ordered/Ordered';
import { Comments } from '../../Comments/Comments';

const Users:FC = () => {
    const { users } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();

    const [limit, setLimit] = useState<number>(10)

    useEffect(() => {
        dispatch(getAllUsersThank(limit));
    },[limit])
    console.log(users);

    return (
        <div id={'users'}>
            <h3>Зареєстровані користувачі</h3>
            <hr/>

            <div className={'users'}>
                <div className={'users-bloc'}>
                    {users && users.map(user => <OneUser key={user.id} user={user}/>)}
                </div>
                {users.length === 10 &&
                <button onClick={() => setLimit(limit + 10)}>Показати ще</button>
                }
            </div>

            <div className={'user-like-detail'}>
                <Likes isSuperUser={true}/>
            </div>
            <div className={'user-basket-detail'}>
                <Basket isSuperUser={true}/>
            </div>
            <div className={'user-ordered-detail'}>
                <Ordered isSuperUser={true}/>
            </div>
            <div className={'user-comments-detail'}>
                <Comments isSuperUser={true}/>
            </div>

        </div>
    );
};

export { Users };
