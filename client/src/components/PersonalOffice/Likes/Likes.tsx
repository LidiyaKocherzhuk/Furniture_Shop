import React, { FC, useEffect } from 'react';
import { BsX } from 'react-icons/bs';

import './Likes.css';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getLikeProductsThank } from '../../../store';
import { OneProductCard } from '../../OneProductCard/OneProductCard';

interface IProps {
    isSuperUser?: boolean;
}

const Likes: FC<IProps> = ({ isSuperUser = false }) => {
    const userFromStorage = localStorage.getItem('isAuth');
    const { likesProducts } = useAppSelector((state) => state.productReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userFromStorage) {
            const user = JSON.parse(userFromStorage);
            dispatch(getLikeProductsThank(user.id));
        }
    }, []);

    const closeMenu = () => {
        const detailElement = document.getElementsByClassName('user-like-detail')[0] as HTMLDivElement;
        detailElement.classList.toggle('user-events-detailShow');
    }

    return (
        <div className={'likes'}>
            {isSuperUser
                ? <h3>Вподобання цього користувача</h3>
                :<h2>Список бажань</h2>
            }
            <hr/>

            <div className={'like-products'}>
                {likesProducts.length
                    ? likesProducts.map((products) => <OneProductCard key={products.id} product={products.product}/>)
                    : <h5>Список бажань порожній!</h5>
                }
            </div>

            {isSuperUser && <BsX onClick={closeMenu} className={'btn-close'}/>}

        </div>
    );
};

export { Likes };
