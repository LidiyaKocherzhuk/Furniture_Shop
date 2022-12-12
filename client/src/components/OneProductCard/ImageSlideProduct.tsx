import React, { FC, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { IImage, ITextileImages } from '../../interfaces';

const ImageSlideProduct:FC<{images: IImage[] | ITextileImages[]}> = ({ images }) => {
    const [imageCount, setImageCount] = useState<number>(0);
    const count = images.length - 1;

    const clickPrev = () => {
        if (imageCount === 0) {
            setImageCount(count);
            return;
        }
        setImageCount(imageCount - 1);
    };

    const clickNext = () => {
        if (imageCount >= count) {
            setImageCount(0);
            return;
        }
        setImageCount(imageCount + 1);
    };
    return (
        <>
            {images.length
                ? <div className={'image-slide'}>
                    <img src={images[imageCount].image} alt=""/>
                    <FaChevronLeft onClick={clickPrev} className={'left'}/>
                    <FaChevronRight onClick={clickNext} className={'right'}/>
                </div>
                : <img
                    src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                    alt="not image"/>
            }
        </>
    );
};

export { ImageSlideProduct };
