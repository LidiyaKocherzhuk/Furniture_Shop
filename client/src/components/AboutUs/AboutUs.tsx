import React, { FC, useEffect, useState } from 'react';

import './AboutUs.css';
import { IImage } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllImagesThunk } from '../../store';
import { AddAboutUs } from './AddAboutUs';

const AboutUs: FC = () => {

    const { images } = useAppSelector(state => state.imagesReducer);
    const [imagesAboutUs, setImagesAboutUs] = useState<IImage[]>([]);
    const dispatch = useAppDispatch();
    const role = localStorage.getItem('role');

    useEffect(() => {
        dispatch(getAllImagesThunk());
    },[]);

    useEffect(() => {
        setImagesAboutUs(images.filter((image: IImage) => image.location === 'aboutUs'))
    },[]);

    const addAboutUs = () => {
        const logoElement = document.getElementsByClassName('add-about-us')[0] as HTMLFormElement;
        logoElement.classList.toggle('show-add-about-us');
    };

    if (imagesAboutUs.length) {
        return (
            <div id={'about-us'}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h1>Дизайнерські меблі – це можливість втілити Вашу мрію про <span>ідеальний інтер'єр</span></h1>
                <div className={'about-us'}>

                    {imagesAboutUs.map(image => <div key={image.id} className={'bloc-aboutUs'}>
                        <h3>{image.description}</h3>
                        <img src={image.image} alt="our photo"/>
                    </div>)}
                    {/*<div className={'left-bloc-aboutUs'}>*/}

                    {/*    <h2>Про нас</h2>*/}

                    {/*    <img src={imagesAboutUs} */}
                    {/*         alt=""/>*/}

                    {/*</div>*/}

                    {/*<div className={'right-bloc-aboutUs'}>*/}

                    {/*    <h5>*/}
                    {/*        Ви можете купити диван та ліжко за власним ескізом. Команді висококласних фахівців Soft.Life.Lviv
                    {/*        під силу реалізувати будь-який проект. </br>
                    {/*        На всю продукцію є сертифікати та гарантії, що підтверджує її високі характеристики.
                    {/*        Окрім красивих мебелів ми дбаємо ще й про сервіс.</br>
                    {/*        Купуйте диван та ліжко не виходячи з дому, або завітайте до нашого виставкового залу.
                    {/*        Приймаємо замовлення Offline (шоурум) та Online.
                    {/*    </h5>*/}

                    {/*    <img src="https://thumb.tildacdn.com/tild6664-6338-4832-b864-343462356633/-/resize/962x/-/format/webp/Rectangle_22.jpg" alt=""/>*/}
                    {/*</div>*/}
                </div>

                <span onClick={addAboutUs} className={'add-aboutUs-btn'}>Додайте щось про себе</span>
                <AddAboutUs/>
            </div>
        );
    }

    if (role === 'superUser') {
        return (
            <div id={'add-about-us'}>
                <span onClick={addAboutUs} className={'add-aboutUs-btn'}>Додайте щось про себе</span>
                <AddAboutUs/>
            </div>
        );
    }

    return (
        <div>

        </div>
    )
};

export { AboutUs };
