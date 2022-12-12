import React, { FC, useEffect } from 'react';

import './AuthStyle.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllImagesThunk } from '../../store';

const Auth: FC = () => {
    const { images } = useAppSelector((state) => state.imagesReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllImagesThunk());
    }, []);

    const backgroundImage = images.find((image, index) => index === 0);
    return (
        <div id={'auth'} style={{ backgroundImage: `url(${backgroundImage?.image})` }}>

        </div>
    );
};

export { Auth };
