import React, { FC, useEffect, useState } from 'react';
import { BsX } from 'react-icons/bs';

import './Basket.css'
import { BasketOneProduct } from './BasketOneProduct';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getBasketProductsThank } from '../../../store/slices/basketSlice';

interface IProps {
    isSuperUser?: boolean;
}

const Basket: FC<IProps> = ({ isSuperUser = false }) => {
    const userFromStorage = localStorage.getItem('isAuth');
    const dispatch = useAppDispatch();
    const { basketProducts, basketPriceCount, pending } = useAppSelector(state => state.basketReducer);

    const [priceCount, setPriceCount] = useState<number>(0);
    const [createdOrder, setCreatedOrder] = useState<boolean>(false);

    useEffect(() => {
        window.scroll(0, 0);

        if (userFromStorage) {
            const user = JSON.parse(userFromStorage);
            dispatch(getBasketProductsThank(user.id));
        }
    }, []);

    useEffect(() => {
        if (basketPriceCount) {
            setPriceCount(Number(basketPriceCount));
        }
    }, [basketPriceCount]);

    const createAnOrder = () => {
        const modalElement = document.getElementsByClassName('modal-thank')[0] as HTMLDivElement;
        modalElement.classList.toggle('modal-thank-show');
        setCreatedOrder(true);

        setTimeout(function () {
            modalElement.classList.toggle('modal-thank-show');
            setCreatedOrder(false);
        }, 3000);
    };

    const getBasketCount = (countPrice: number) => {
        setPriceCount(priceCount + countPrice);
    };

    const closeMenu = () => {
        const detailElement = document.getElementsByClassName('user-basket-detail')[0] as HTMLDivElement;
        detailElement.classList.toggle('user-events-detailShow');
    }

    if (pending) {
        return (
            <h5>Loading...</h5>
        )
    }
    return (
        <div className={'basket'}>

            <div className="basket-header">
                {isSuperUser
                    ? <h3>Корзина цього користувача</h3>
                    :  <h2>Корзина</h2>
                }
            </div>

            <hr/>

            <div className="basket-body">
                {basketProducts.length ?

                    basketProducts.map(basketProduct =>
                        <BasketOneProduct
                            key={basketProduct.id}
                            basketProduct={basketProduct}
                            getBasketCount={getBasketCount}
                            createdOrder={createdOrder}
                            deleteFrom={'basket'}
                        />)

                    : <h5>У корзині нічого немає!</h5>
                }
            </div>

            {basketProducts.length ? <div className={'send-btn'}>
                <h4>До оплати: <span className={'price-count'}>{priceCount} грн.</span></h4>
                <button onClick={createAnOrder}>Сформувати замовлення</button>
            </div> : null
            }
            <div className={'modal-thank'}>
                <h3>Дякуємо за замовлення! </h3>
                <h3>Гарного дня! </h3>
            </div>

            {isSuperUser && <BsX onClick={closeMenu} className={'btn-close'}/>}

        </div>
    );
};

export { Basket };
