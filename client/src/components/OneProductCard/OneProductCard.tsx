import React, { FC, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import {
    BsCartCheckFill,
    BsCartPlusFill,
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

import './OneProductCard.css';
import { isLikeService } from '../../services';
import { IProduct, IUserFromStorage } from '../../interfaces';
import { ImageSlideProduct } from './ImageSlideProduct';
import { useAppDispatch } from '../../hooks';
import { saveBasketProductsThank } from '../../store/slices/basketSlice';

interface IPropsData {
    product: IProduct;
}

const OneProductCard: FC<IPropsData> = ({ product }) => {
    const {
        id,
        model,
        type,
        images,
        price,
        isNovelty,
        isPopular,
    } = product;

    const userFromStorage = localStorage.getItem('isAuth');
    const dispatch = useAppDispatch();

    const [userData, setUserData] = useState<IUserFromStorage>({ id: 0, basket: [], likes: [] });
    const [like, setLike] = useState(false);
    const [basket, setBasket] = useState(false);
    const [noAuthorized, setNoAuthorized] = useState(true);

    useEffect(() => {
        if (userFromStorage) {
            const { id, basket, likes } = JSON.parse(userFromStorage);
            setUserData({ id, basket, likes });
            setNoAuthorized(false);
        }

    }, [])

    useEffect(() => {
        if (userData.basket) {
            for (const item of userData.basket) {
                if (item.productId === id) {
                    setBasket(true);
                }
            }
        }

        if (userData.likes) {
            for (const item of userData.likes) {
                if (item.productId === id) {
                    setLike(true);
                }
            }
        }

    }, [userData.basket, userData.likes])

    const inBasket = () => {
        setBasket(true);
        dispatch(saveBasketProductsThank({
            userId: userData.id,
            productId: product.id,
            productCountPrice: Number(product.price),
            productCount: 1,
        }));
    };

    const isLike = async () => {
        if (!like) {
            setLike(true);
            const { data } = await isLikeService.save({ userId: userData.id, productId: product.id, isLike: true });
            localStorage.setItem('isAuth', JSON.stringify(data));
            return;
        }
        setLike(false);
        await isLikeService.delete({ userId: userData.id, productId: product.id })
    };

    return (
        <div className={'one-product'}>
            <div className={'one-product-top'}>
                <div className={'image-card'}>

                    <ImageSlideProduct images={images}/>

                    <FaHeart onClick={isLike} className={'image-icon heart'}
                        style={{ color: like ? '#ff4d00' : undefined }}/>
                    {basket &&
                    <BsCartCheckFill className={'image-icon in-basket'}/>
                    }

                </div>
                <div className={'one-product-description'}>
                    <div className={'popular-new-icons'}>
                        {isNovelty && <div className={'novelty-new'}><strong>new</strong></div>}
                        {isPopular && <div className={'popular-new'}><strong>топ</strong></div>}
                    </div>
                    <h5><Link to={'/productDetail'} state={{ product }}>{type} {model}</Link></h5>
                    <h4 className={'price'}><strong> {price} </strong> грн.</h4>

                </div>
            </div>

            <div className={'one-product-footer'}>
                <button disabled={noAuthorized} onClick={inBasket}>В корзину <BsCartPlusFill/></button>
            </div>


        </div>
    );
};

export { OneProductCard };
