import React, { FC, useEffect, useState } from 'react';
import { BsX } from 'react-icons/bs';

import './Comments.css';
import { IUserExtends } from '../../../interfaces';
import { ICommentExtends } from '../../../interfaces/commentInterface';
import { OneUserComment } from './OneUserComment';

interface IProps {
    isSuperUser?: boolean;
}

const Comments: FC<IProps> = ({ isSuperUser = false }) => {
    const userFromStorage = localStorage.getItem('isAuth');
    const [user, setUser] = useState<IUserExtends>({
        age: 0,
        basket: [],
        city: '',
        comments: [],
        createdAt: '',
        deletedAt: '',
        email: '',
        id: 0,
        image: '',
        likes: [],
        meetings: [],
        ordered: [],
        password: '',
        phone: '',
        role: '',
        surname: '',
        username: ''
    });
    const [userComments, setUserComments] = useState<ICommentExtends[]>([]);

    useEffect(() => {
        if (userFromStorage) {
            const parseUser = JSON.parse(userFromStorage) as IUserExtends;
            setUser(parseUser);
        }
    }, [userFromStorage]);

    useEffect(() => {
        if (user.comments) {
            setUserComments(user.comments);
        }
    },[user.comments])

    const closeMenu = () => {
        const detailElement = document.getElementsByClassName('user-comments-detail')[0] as HTMLDivElement;
        detailElement.classList.toggle('user-events-detailShow');
    }

    return (
        <div className={'comments-user'}>
            {isSuperUser
                ?<h3>Відгуки цього користувача</h3>
                :<h2>Мої відгуки</h2>}
            <hr/>

            <div className={'all-user-comments'}>
                {userComments.length ? userComments.map((comment) =>
                    <OneUserComment key={comment.id} comment={comment}/>)
                    : <h5>Відгуків немає!</h5>
                }
            </div>

            {isSuperUser && <BsX onClick={closeMenu} className={'btn-close'}/>}

        </div>
    );
};

export { Comments };
