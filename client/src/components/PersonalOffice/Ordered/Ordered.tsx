import React, { FC, useEffect } from 'react';
import { BsX } from 'react-icons/bs';

import { BasketOneProduct } from '../../Header/Basket/BasketOneProduct';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getOrderedProductsThank } from '../../../store/slices/orderedSlice';

interface IProps {
    isSuperUser?: boolean;
}

const Ordered:FC<IProps> = ({ isSuperUser = false }) => {
    const userFromStorage = localStorage.getItem('isAuth');
    const dispatch = useAppDispatch();
    const { orderedProducts, orderedPriceCount } = useAppSelector(state => state.orderedReducer);

    useEffect(() => {
        window.scroll(0, 0);

        if (userFromStorage) {
            const user = JSON.parse(userFromStorage);
            dispatch(getOrderedProductsThank(user.id));
        }
    }, [orderedProducts.length, orderedPriceCount]);

    const closeMenu = () => {
        const detailElement = document.getElementsByClassName('user-ordered-detail')[0] as HTMLDivElement;
        detailElement.classList.toggle('user-events-detailShow');
    }

    return (
        <div>

            <div className="basket-header">
                {isSuperUser
                    ? <h3>Замовлення цього користувача</h3>
                    : <h2>Мої замовлення</h2>
                }
            </div>

            <hr/>

            <div className="basket-body">
                {orderedProducts.length ?
                    orderedProducts.map(basketProduct =><div key={basketProduct.id}>
                        <BasketOneProduct
                            basketProduct={basketProduct}
                            deleteFrom={'ordered'}
                        />
                    </div>)
                    : <h5>Замовлень немає!</h5>
                }
            </div>

            {orderedProducts.length ? <div className={'send-btn'}>
                <h4>Загальна сума: <span className={'price-count'}>{orderedPriceCount} грн.</span></h4>
            </div> : null
            }

            {isSuperUser && <BsX onClick={closeMenu} className={'btn-close'}/>}
        </div>
    );
};

export { Ordered };
