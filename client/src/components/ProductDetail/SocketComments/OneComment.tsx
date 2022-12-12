import React, { FC } from 'react';
import Moment from 'moment';
import { BsX } from 'react-icons/bs';

import './SocketComments.css';
import { ICommentExtends } from '../../../interfaces/commentInterface';

interface IProps{
    comment: ICommentExtends;
    firstLater: string;
    connectUserId: number;
    getDeleteData: (deleteData: number) => any;
}

const OneComment:FC<IProps> = ({
    comment,
    firstLater,
    connectUserId,
    getDeleteData,
}) => {
    const role = localStorage.getItem('role');
    const date = Moment(comment.createdAt).format('DD-MM-YYYY');

    const {
        id, userId, username, surname, image, message,
    } = comment;

    const deleteComment = () => {
        getDeleteData(id);
    };

    return (
        <div className={'comment'}>
            <div className={'user-comment'}>
                {
                    image
                        ? <img src={image} alt="фото" className="avatar-dropdown"/>
                        : <div className="avatar-dropdown">{firstLater}</div>
                }

                <h6>{username} {surname}.</h6>
            </div>
            <p>{message} <span className={'comment-date'}>{date}</span></p>

            {(userId === connectUserId || role === 'superUser')
            && <BsX onClick={deleteComment} className={'btn-close'}/>
            }

            <hr/>
        </div>
    );
};

export { OneComment };
