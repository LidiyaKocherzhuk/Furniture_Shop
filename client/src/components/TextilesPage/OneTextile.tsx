import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ITextileExtends } from '../../interfaces';
import { ImageSlideProduct } from '../OneProductCard/ImageSlideProduct';

interface IProps {
    textile: ITextileExtends;
}

const OneTextile:FC<IProps> = ({ textile }) => {

    const navigate = useNavigate();

    const {
        textileName,
        types,
        manufacturer,
        images,
    } = textile;

    const getDetail = (e: any) => {
        e.preventDefault();
        window.scroll(0, 0);

        const textileDetailElement = document.getElementsByClassName('textile-detail')[0] as HTMLElement;
        textileDetailElement.classList.toggle('textile-detail-show');

        navigate('detail', { state:{ textile } })
    }

    return (
        <div id={'one-textile'}>
            <ImageSlideProduct images={images}/>
            <h6 onClick={getDetail}>{textileName}</h6>
            <p>{manufacturer}</p>
            <p>{types}</p>
        </div>
    );
};

export { OneTextile };
