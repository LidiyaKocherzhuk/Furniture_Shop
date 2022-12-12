import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import './TextilesPage.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllTextileThank } from '../../store/slices/textileSlice';
import { OneTextile } from './OneTextile';

const TextilesPage:FC = () => {

    const { textiles } = useAppSelector(state => state.textileReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllTextileThank());
    },[])

    return (
        <div id={'all-textiles'}>

            <h2>Наш неймовірний вибір тканин</h2>

            <div className={'textiles-box'}>
                {textiles.map(textile => <OneTextile key={textile.id} textile={textile}/>)}
            </div>

            <div className={'textile-detail'}>
                <Outlet/>
            </div>
        </div>
    );
};

export { TextilesPage };
