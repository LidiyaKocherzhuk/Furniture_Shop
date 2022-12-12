import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './AllProductsPage.css';
import { SlideMenu, Filter, OneProductCard } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductsByParamsThank, getProductsThank, sortProductsByParamsThank } from '../../store';
import { IProduct } from '../../interfaces';

type LocationState = {
    popularProducts: IProduct[];
    productType: string;
}

const AllProductsPage: FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(state => state.productReducer);

    const [type, setType] = useState<string>('');
    const [sortParam, setSortParam] = useState<string>('');
    const [orderParam, setOrderParam] = useState<'ASC' | 'DESC'>('ASC');
    const [price, setPrice] = useState<string>('100000')
    const [params, setParams] = useState<Partial<IProduct>>({});
    const [isPopular, setIsPopular] = useState<boolean>(false);
    const [limit, setLimit] = useState<number>(10);

    const { popularProducts, productType } = location.state as LocationState;

    useEffect(() => {
        window.scroll(0, 700)

        if (productType) {
            setType(productType);
            dispatch(getProductsByParamsThank({ type: productType, limit }));
            return;
        } else if (popularProducts) {
            dispatch(getProductsByParamsThank({ isPopular: 'on', limit }));
            setIsPopular(true);
            return;
        }
        dispatch(getProductsThank(limit));
        console.log('aaa');
    }, [productType]);

    useEffect(() => {
        if (sortParam && orderParam) {
            sendSortReq(sortParam, orderParam);
        } else if (isPopular) {
            dispatch(getProductsByParamsThank({ isPopular: 'on', limit }));
        } else if (params) {
            return;
        } else {
            dispatch(getProductsThank(limit));
        }
    }, [])

    const getFilterData = (data: any) => {
        if (data.price) {
            setPrice(data.price);
            delete data.price;
        }
        if (data.type) {
            setType(data.type);
            delete data.type;
        } else {
            setType('');
        }

        setParams(data);
    }

    const sortProduct = (sort: string, order: 'ASC' | 'DESC', clearLimit: number)
        : (event: React.MouseEvent) =>
        Promise<void> => {
        return async (event: React.MouseEvent) => {
            event.preventDefault();

            setSortParam(sort);
            setOrderParam(order);
            setLimit(clearLimit)

            sendSortReq(sort, order)

        }
    }

    const sendSortReq = (sort: string, order: 'ASC' | 'DESC') => {

        console.log(type);
        if (!type) {

            dispatch(sortProductsByParamsThank({
                sortParam: sort,
                orderParam: order,
                price,
                params,
                limit,
            }));
            return;
        }

        dispatch(sortProductsByParamsThank({
            sortParam: sort,
            orderParam: order,
            price,
            params: { ...params, type },
            limit,
        }));
    }

    const next = () => {
        if (products.length < limit) {
            return;
        }
        setLimit(limit + 10);
    }

    console.log(products);

    return (
        <div>
            <SlideMenu/>
            <div className={'products-bloc'}>
                <Filter getFilterData={getFilterData} limit={limit} locationType={type}/>

                <div className={'right-products-bloc'}>

                    <div className={'sort-bloc'}>
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
                                id="dropdownMenuLink"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Сортувати
                            </a>

                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                                <li>
                                    <button onClick={sortProduct('price', 'DESC', 10)}
                                        className="dropdown-item">
                                        За спаданням ціни
                                    </button>
                                </li>

                                <li>
                                    <button onClick={sortProduct('price', 'ASC', 10)}
                                        className="dropdown-item">
                                        За зростанням ціни
                                    </button>
                                </li>

                                <li>
                                    <button onClick={sortProduct('createdAt', 'DESC', 10)}
                                        className="dropdown-item">
                                        За датою (найновіші)
                                    </button>
                                </li>

                                <li>
                                    <button onClick={sortProduct('createdAt', 'ASC', 10)}
                                        className="dropdown-item">
                                        За датою (найстаріші)
                                    </button>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div className={'all-product'}>
                        {products.map((product: any) => <OneProductCard key={product.id} product={product}/>)}
                    </div>

                    <div className={'pagination-btn'}>
                        <button onClick={next} id={'next-btn'}>показати ще</button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export { AllProductsPage };
