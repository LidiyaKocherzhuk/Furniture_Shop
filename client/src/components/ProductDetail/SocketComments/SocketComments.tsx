import React, { FC, useEffect, useState } from 'react';
import io from 'socket.io-client';

import './SocketComments.css';
import { urls } from '../../../config';
import { IProduct, IUserExtends } from '../../../interfaces';
import { ICommentExtends } from '../../../interfaces/commentInterface';
import { OneComment } from './OneComment';

interface IValue extends HTMLTextAreaElement {
    message: string
}

interface IProps {
    product: IProduct;
}

const SocketComments: FC<IProps> = ({ product }) => {
    const { id, type, model, images } = product

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
    const [userFirstLater, setUserFirstLater] = useState<string>('');

    useEffect(() => {
        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);

    useEffect(() => {
        if (user.username) {
            setUserFirstLater(user?.username[0].toUpperCase())
        }
    }, [user.username]);

    const socket = io(urls.BASE_URL, { query: { userId: user.id, userName: user.username } });

    const [comments, setComments] = useState<ICommentExtends[]>([]);
    const [data, setData] = useState<string>('');
    const [deleteComment, setDeleteComment] = useState<number>(0)


    useEffect(() => {
        socket.on('connect', () => {
            if (id) {
                socket.emit('send_productId', { productId: id });
                socket.on('comments_by_productId', data => {
                    setComments(data);
                });
            }

            if (data) {
                socket.emit('new_messages', {
                    message: data,
                    userId: user.id,
                    image: user.image,
                    username: user.username,
                    surname: user.surname,
                    productId: id,
                    product_model: model,
                    product_type: type,
                    product_image: images[0],
                });
                setData('');
            }

            if (deleteComment) {
                socket.emit('delete_comment', { id: deleteComment, productId: id });
                setDeleteComment(0);
            }

            socket.on('return_comments', data => {
                setComments(data.comments);
                localStorage.setItem('isAuth', JSON.stringify(data.userWithNewComments))
                console.log(data);
            });

            socket.on('return_update-comments', data => {
                setComments(data.comments);
                localStorage.setItem('isAuth', JSON.stringify(data.userWithNewComments))
                console.log(data);
            });
        });

    }, [data, id, deleteComment]);

    const getMessage: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const textAreaElement = document.getElementsByTagName('textarea')[0] as IValue;

        setData(textAreaElement.value);
        textAreaElement.value = '';
    }

    const getDeleteData = (deleteData: number) => {
        setDeleteComment(deleteData);
    };
    console.log(comments);

    return (
        <div>
            <div className={'make_comment'}>
                <h4>Залишити відгук</h4>

                <textarea name={'message'}/>
                <button onClick={getMessage}>Відправити</button>

            </div>
            <hr/>
            <div className={'comments'}>
                {comments.length ?
                    comments.map(comment => <OneComment
                        key={comment.id}
                        comment={comment}
                        firstLater={userFirstLater}
                        connectUserId={user.id}
                        getDeleteData={getDeleteData}
                    />)
                    : <h6>Відгуків немає!</h6>
                }

            </div>
        </div>
    );
};

export { SocketComments };
