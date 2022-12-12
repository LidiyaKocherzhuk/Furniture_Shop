import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Popular.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { OneProductCard } from '../OneProductCard/OneProductCard';
import { getProductsByParamsThank } from '../../store';

const Popular: FC = () => {

    const { products } = useAppSelector(state => state.productReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsByParamsThank({ isPopular: 'on', limit: 10 }));
    }, []);

    const next = () => {
        navigate('/allProducts', { state: { popularProducts: products } });
    }

    return (
        <div className={'popular'}>
            <hr/>
            <h1 className={'popular-header'}>Популярне серед наших покупців</h1>

            {products.length ?
                <div className={'popular-cards'}>

                    <div className={'cards'}>
                        {products.map(product => <OneProductCard key={product.id} product={product}/>)}
                    </div>

                    <div className={'pagination-btn'}>
                        <button onClick={next} id={'next-btn'}>показати ще</button>
                    </div>

                </div>
                : <h4>Тут ще немає товарів!</h4>
            }

        </div>
    );
};

export { Popular };
