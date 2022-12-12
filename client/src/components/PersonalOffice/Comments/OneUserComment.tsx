import React, { FC } from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';

import { ICommentExtends } from '../../../interfaces';


interface IProps {
    comment: ICommentExtends;
}

const OneUserComment: FC<IProps> = ({ comment }) => {

    const date = Moment(comment.createdAt).format('DD-MM-YYYY');
    const { message, productId, product_model, product_type, product_image  } = comment;

    return (
        <div className={'one-user-comment'}>

            <div className={'product-comment'}>
                <Link to={'/productDetail'} state={{ productId }}><h6>{product_type} {product_model}</h6></Link>
                {product_image
                    ? <div><img src={product_image} alt="фото товару"/></div>
                    : <div><img
                        src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                        alt="фото немає"/></div>
                }
            </div>

            <div className={'comment-message'}>
                <p>{message} <span className={'date'}>{date}</span></p>
            </div>

        </div>
    );
};

export { OneUserComment };
