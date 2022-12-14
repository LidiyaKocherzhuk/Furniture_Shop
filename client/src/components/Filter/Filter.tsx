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
                <label htmlFor="customRange2" className="form-label">????????:</label>
                <label
                    htmlFor="customRange2"
                    className="form-label price-label"
                >???? <span className={'price-span'}>{price}??????.</span>
                </label>
                <input
                    type="range"
                    name={'price'}
                    className={'form-range'}
                    min="0" max="100000"
                    id="customRange2"/>
            </div>

            <hr/>

            <div className={'div-100w'}> ?????? ????????????: <br/>

                <p>{type ? type : '?????? ????????????'}</p>
                <div onClick={() => setType('')}> ?????? ????????????</div>
                <div onClick={() => setType('??????????')} >??????????</div>
                <div onClick={() => setType('????????????')} >????????????</div>
                <div onClick={() => setType('??????????')} >????????????</div>
                <div onClick={() => setType('????????????????')} >????????????????</div>
                <div onClick={() => setType('??????????')} >??????????</div>
                <div onClick={() => setType('??????????')} >????????????</div>
                <div onClick={() => setType('??????')} >????????</div>
                <div onClick={() => setType('??????????????')} >??????????????</div>
                <div onClick={() => setType('??????????????')} >??????????????</div>

            </div>

            <hr/>

            <form>

                <label className={'label-100w'}>??????????????????: <input type={'checkbox'} {...register('isPopular')} value={'on'}/></label>
                <label className={'label-100w'}>??????????????: <input type={'checkbox'} {...register('isNovelty')} value={'on'}/></label>

                <hr/>

                <button onClick={handleSubmit(getThisFilterData)}>??????????????????????</button>
            </form>

        </div>

    );
};

export { Filter };
