import React, { FC } from 'react';
import { RiUserSmileLine } from 'react-icons/ri';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import { IImage } from '../../interfaces';
import './Slide.css';

interface IProps {
    item: IImage;
    getImageId: (id: number, description: string | undefined) => void;
}

const Slide: FC<IProps> = ({ item, getImageId }) => {
    const { id, image, description } = item;
    const role = localStorage.getItem('role');

    function showBloc() {
        getImageId(id, description)
        const bloc = document.getElementsByClassName('update-image_hide_bloc')[0] as HTMLDivElement;
        bloc.classList.toggle('update-image_show_bloc')
    }

    return (
        <div className="carousel-item active">
            <div className={'image'} style={{
                backgroundImage: `url(${image})`
            }}>
                <div className={'invite'}>
                    <div className={'invite-description'}>
                        <h1>{description}</h1>
                        <h4><BsGrid3X3Gap/> Вибирайте з каталогу</h4>
                        <h4><RiUserSmileLine/> Або ж запропонуйте щось своє </h4>
                        <div className={'invite-btn'}>
                            <NavLink to={'/allProducts'} state={{ productType: '' }}>Каталог</NavLink>
                        </div>
                    </div>
                </div>

                {role === 'superUser'
                    ? <button onClick={showBloc} className={'image-btn'}>Змінити фото</button>
                    : null
                }

            </div>
        </div>
    );
};

export { Slide };

