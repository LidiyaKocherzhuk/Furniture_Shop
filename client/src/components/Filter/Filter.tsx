import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import './Filter.css';
import { useAppDispatch } from '../../hooks';
import { filterByParamsThank } from '../../store';
import { IProductLimit } from '../../interfaces';

interface PropsData {
    getFilterData: (data: any) => void;
    limit: number;
    locationType: string | null;
}

const Filter: FC<PropsData> = ({ getFilterData, limit, locationType }) => {
    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();

    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [filterData, setFilterData] = useState<Partial<IProductLimit>>({});

    useEffect(() => {
        if (locationType) {
            setType(locationType);
        }
    },[locationType]);

    useEffect(() => {
        sendFilterReq(filterData);
    },[limit]);

    const filterProducts = (e: any) => {
        e.preventDefault();
        setPrice(e.target.value);
    };

    const getThisFilterData = (data: any) => {
        for (const dataKey in data) {
            if (!data[dataKey]) {
                delete data[dataKey]
            }
        }

        setFilterData(data);
        sendFilterReq(data);

    };

    const sendFilterReq = (data: Partial<IProductLimit>) => {

        if (!data && !type && !price) {
            return;
        } else if (!type && !price) {
            dispatch(filterByParamsThank({ ...data, price: '100000', limit }));
            getFilterData(data);
        } else if (!type) {
            dispatch(filterByParamsThank({ ...data, price, limit }));
            getFilterData({ ...data, price });
        }
        else if (!price) {
            dispatch(filterByParamsThank({ ...data, type, price: '100000', limit }));
            getFilterData({ ...data, type });
        } else {
            dispatch(filterByParamsThank({ ...data, type, price, limit }));
            getFilterData({ ...data, type, price });
        }

    }
    console.log(type);

    return (
        <div className={'filter-bloc'}>

            <div onChange={filterProducts}>
                <label htmlFor="customRange2" className="form-label">Ціна:</label>
                <label
                    htmlFor="customRange2"
                    className="form-label price-label"
                >до <span className={'price-span'}>{price}грн.</span>
                </label>
                <input
                    type="range"
                    name={'price'}
                    className={'form-range'}
                    min="0" max="100000"
                    id="customRange2"/>
            </div>

            <hr/>

            <div className={'div-100w'}> Тип товару: <br/>

                <p>{type ? type : 'Всі вироби'}</p>
                <div onClick={() => setType('')}> Всі вироби</div>
                <div onClick={() => setType('Ліжко')} >Ліжка</div>
                <div onClick={() => setType('Крісло')} >Крісла</div>
                <div onClick={() => setType('Диван')} >Дивани</div>
                <div onClick={() => setType('Банкетка')} >Банкетки</div>
                <div onClick={() => setType('Тумба')} >Тумби</div>
                <div onClick={() => setType('Комод')} >Комоди</div>
                <div onClick={() => setType('Пуф')} >Пуфи</div>
                <div onClick={() => setType('Стілець')} >Стільці</div>
                <div onClick={() => setType('Лавочка')} >Лавочки</div>

            </div>

            <hr/>

            <form>

                <label className={'label-100w'}>Популярні: <input type={'checkbox'} {...register('isPopular')} value={'on'}/></label>
                <label className={'label-100w'}>Новинки: <input type={'checkbox'} {...register('isNovelty')} value={'on'}/></label>

                <hr/>

                <button onClick={handleSubmit(getThisFilterData)}>Застосувати</button>
            </form>

        </div>

    );
};

export { Filter };
