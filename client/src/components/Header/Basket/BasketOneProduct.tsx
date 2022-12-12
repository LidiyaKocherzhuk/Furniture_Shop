import React, { FC, useEffect, useState } from 'react';
import { BsX } from 'react-icons/bs';

import './BasketOneProduct.css'
import { useAppDispatch } from '../../../hooks';
import {
    deleteBasketByIdThank,
    deleteBasketProduct,
    getBasketProductsThank,
} from '../../../store/slices/basketSlice';
import { IBasketProdukt } from '../../../interfaces';
import {
    deleteOrderedByIdThank,
    deleteOrderedProduct,
    saveOrderedProductsThank,
} from '../../../store/slices/orderedSlice';

interface PropsData {
    basketProduct: IBasketProdukt;
    getBasketCount?: (countPrice: number) => void;
    createdOrder?: boolean;
    deleteFrom: string;
}

const BasketOneProduct: FC<PropsData> = ({
    basketProduct,
    getBasketCount,
    createdOrder,
    deleteFrom,
}) => {

    const { id, product, userId, productCountPrice, productCount } = basketProduct;
    const { model, price, images, type } = product;
    const dispatch = useAppDispatch();

    const [productPrice, setProductPrice] = useState<number>(0);
    const [countProduct, setCountProduct] = useState<number>(1);

    useEffect(() => {
        setProductPrice(productCountPrice);
        setCountProduct(productCount);
    }, []);

    useEffect(() => {
        dispatch(getBasketProductsThank(userId));
    },[]);

    const minusOne = async (e: any) => {
        e.preventDefault();
        if (countProduct === 1) {
            return;
        }
        setCountProduct(countProduct - 1);
        setProductPrice(productPrice - Number(price));

        if (getBasketCount) {
            getBasketCount(productPrice);
        }
    };

    const plusOne = async (e: any) => {
        e.preventDefault();
        setCountProduct(countProduct + 1);
        setProductPrice(productPrice + Number(price));

        if (getBasketCount) {
            getBasketCount(productPrice);
        }
    };

    useEffect(() => {
        if (createdOrder) {
            dispatch(saveOrderedProductsThank({
                userId: userId,
                productId: product.id,
                productCountPrice: productPrice,
                productCount: countProduct,
            }));
        }
        return;
    },[createdOrder]);

    const deleteProductFromBasket = () => {
        dispatch(deleteBasketByIdThank({ id, userId }));
        dispatch(deleteBasketProduct({ id }));
    }

    const deleteProductFromOrdered = () => {
        dispatch(deleteOrderedByIdThank({ id, userId }));
        dispatch(deleteOrderedProduct({ id }))
    }

    return (
        <div>
            <div key={basketProduct.id} className={'basket-product'}>

                <div className={'col-8'}>
                    {images[0] ?
                        <img src={images[0].image} alt="зображення товару"/> :
                        <img
                            src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                            alt="not image"/>
                    }

                    <h5>{type} {model}</h5>
                </div>

                <div className={'product-count'}>
                    <div onClick={minusOne}>-</div>
                    <span>{countProduct}</span>
                    <div onClick={plusOne}>+</div>
                </div>

                <h4>{productPrice} грн.</h4>
                <BsX onClick={
                    deleteFrom==='basket'
                        ? deleteProductFromBasket
                        : deleteProductFromOrdered
                } className={'btn-close'}/>

            </div>
            <hr/>

        </div>
    )
};

export { BasketOneProduct };
