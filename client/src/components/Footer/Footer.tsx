import React, { FC } from 'react';
import { FaInstagram,
    FaFacebookF,
    FaTelegramPlane,
} from 'react-icons/fa';

import './Footer.css';
// import { imagesService } from '../../services';
import { NavLink } from 'react-router-dom';
// import { useAppSelector } from '../../hooks';

const Footer:FC = () => {
    // const { images } = useAppSelector(state => state.imagesReducer);
    // const [logoImage, setLogoImage] = useState('');

    // useEffect(() => {
    //     imagesService.getByParams({ location: 'logo' }).then(value => {
    //         if (value.data.length) {
    //             setLogoImage(value.data[0].image)
    //         }
    //         return;
    //     })
    // }, [images.length]);

    return (
        <div id={'footer'}>
            <div className={'footer-top'}>
                <div className={'contacts'}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
                        alt="no image"/>
                    {/*{logoImage ? <img src={logoImage} alt="logo"/>*/}
                    {/*    :  <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"*/}
                    {/*        alt="no image"/>*/}
                    {/*}*/}

                    <p>Любінська 105, Львів, Україна</p>
                    <p>(068)-382-3743</p>
                    <p>lidiyakocherzchuk@gmail.com</p>

                </div>

                <div className={'follow'}>
                    <h5>Наші товари</h5>

                    <div className={'footer-links'}>
                        <NavLink to={'/allProducts'} state={'Ліжко'}>Ліжка</NavLink>
                        <NavLink to={'/allProducts'} state={'Диван'}>Дивани</NavLink>
                        <NavLink to={'/allProducts'} state={'Банкетка'}>Банкетки</NavLink>
                        <NavLink to={'/allProducts'} state={'Тумба'}>Тумби</NavLink>
                        <NavLink to={'/allProducts'} state={'Комод'}>Комоди</NavLink>
                        <NavLink to={'/allProducts'} state={'Пуф'}>Пуфи</NavLink>
                        <NavLink to={'/allProducts'} state={'Крісло'}>Крісла</NavLink>
                        <NavLink to={'/allProducts'} state={'Стілець'}>Стільці</NavLink>
                        <NavLink to={'/allProducts'} state={'Лавочка'}>Лавочки</NavLink>
                    </div>

                </div>
                <div className={'footer-nav'}>

                    <div className={'payByCard'}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/640px-Visa.svg.png"
                            alt="visa"/>
                        <img src="https://itc.ua/wp-content/uploads/2015/02/MasterCard.png"
                            alt="mastercard"/>
                    </div>

                    <div className={'networks-icons'}>
                        <a href="https://www.instagram.com/soft.life.lviv/"><FaInstagram
                            className={'FaInstagram'}/></a>
                        <a href="https://www.facebook.com/soft.life.lviv"><FaFacebookF className={'FaFacebookF'}/></a>
                        <a href="https://t.me/Lidiya_Kocherzhuk"><FaTelegramPlane className={'FaTelegramPlane'}/></a>
                    </div>
                </div>
            </div>

            <div className={'product-created'}><p>© 2022 by Soft Life. Proudly created with lidiyakocherzchuk@gmail.com</p></div>
        </div>
    );
};

export { Footer };
