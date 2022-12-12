import React, { FC, useEffect, useState } from 'react';
import { FaCaretDown, FaShoppingBasket } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsX } from 'react-icons/bs';

import './Header.css';
import { DropDownMenuCatalog } from '../DropDownMenuCatalog/DropDownMenuCatalog';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOutThank, saveImageThunk } from '../../store';
import { IUserExtends } from '../../interfaces';
// import { imagesService } from '../../services';

const Header: FC = () => {
    const { user } = useAppSelector(state => state.authReducer);
    const { images } = useAppSelector(state => state.imagesReducer);
    const isAuth = localStorage.getItem('isAuth');
    // const role = localStorage.getItem('role');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // const [logoImage, setLogoImage] = useState<string>('');
    const [scrollY, setScrollY] = useState<boolean>(false)
    const downMenuElement = document.getElementsByClassName('down-menu')[0] as HTMLDivElement;

    const mouseEnter = () => {
        downMenuElement.classList.toggle('show-down-menu');
    };

    const mouseLeave = (): void => {
        downMenuElement.classList.toggle('show-down-menu');
    };

    const logOut = () => {
        if (isAuth) {
            const user = JSON.parse(isAuth) as IUserExtends;
            dispatch(logOutThank(user.id));
            navigate('logIn');
        }
    }

    const firstLater = user?.username.charAt(0).toUpperCase();

    window.onscroll = () => {
        if (window.scrollY >= 90) {
            setScrollY(true)
        }
        if (window.scrollY < 90) {
            setScrollY(false);
        }
    }

    useEffect(() => {
        // imagesService.getByParams({ location: 'logo' }).then(value => {
        //     if (value.data.length) {
        //         setLogoImage(value.data[0].image);
        //     }
        //     return;
        // })

        const headerElement = document.getElementsByClassName('header')[0] as HTMLDivElement;
        const logoImage = document.getElementById('logo') as HTMLImageElement;
        const downMenuElement = document.getElementsByClassName('down-menu')[0] as HTMLDivElement;
        const dropdownMenuUser = document.getElementById('dropdownMenuButton1') as HTMLDivElement;

        if (scrollY) {
            headerElement.style.height = '45px';
            logoImage.style.width = '40%';
            logoImage.style.transition = '1s';
            downMenuElement.style.top = '44px';
            if (dropdownMenuUser) {
                dropdownMenuUser.style.height = '35px';
            }
            return;
        }

        headerElement.style.height = '80px';
        logoImage.style.width = '65%';
        logoImage.style.transition = '1s';
        downMenuElement.style.top = '79px';
        if (dropdownMenuUser) {
            dropdownMenuUser.style.height = '45px';
        }
    }, [scrollY, images.length])

    const clickToAboutUs = () => {
        const aboutUsElement = document.getElementById('about-us') as HTMLElement;

        if (location.pathname !== '/') {
            navigate('/', { state: 'about-us' });
            return;
        }
        window.scroll(0, aboutUsElement.offsetTop)

    }

    const clickToFooter = () => {
        const footerElement = document.getElementById('footer') as HTMLElement;

        window.scroll(0, footerElement.offsetTop);
    }

    const showAddMenu = () => {
        const logoElement = document.getElementsByClassName('add-logo')[0] as HTMLFormElement;
        logoElement.classList.toggle('show-add-logo');
    };

    const addLogoImage = (e: any) => {
        e.preventDefault();

        const data = document.getElementById('add-logo-image') as HTMLFormElement
        const form = new FormData(data);
        form.set('location', 'logo');

        dispatch(saveImageThunk(form));

        showAddMenu();
    };

    return (
        <div id={'header'}>
            <div className={'header'}>

                <div className={'logo'}>
                    <div className={'d-flex-center'}>
                        <NavLink to={'/'}>
                            <img id={'logo'}
                                src="https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
                                alt="no image"/>
                        </NavLink>
                        {/*{logoImage ?*/}
                        {/*    <NavLink to={'/'}>*/}
                        {/*        <img id={'logo'} src={logoImage} alt="logo"/>*/}
                        {/*    </NavLink>*/}
                        {/*    : (role === 'superUser' ?*/}
                        {/*        <div id={'logo'}>*/}
                        {/*            <button onClick={showAddMenu}>+логотип</button>*/}
                        {/*        </div>*/}
                        {/*        : <NavLink to={'/'}>*/}
                        {/*            <img id={'logo'}*/}
                        {/*                src="https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"*/}
                        {/*                alt="no image"/>*/}
                        {/*        </NavLink>)*/}

                        {/*}*/}

                    </div>

                    <form id={'add-logo-image'} className={'add-logo'}> Додайте логотип: <input
                        id={'input-image-element'}
                        type="file" name={'image'}/>

                    <button onClick={addLogoImage}>Зберегти</button>
                    <BsX onClick={showAddMenu} className={'logo-close-btn'}/>

                    </form>

                </div>

                <div className={'nav-menu d-flex'}>

                    <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} id={'catalog'}
                        className={'col-3 d-flex-center'}>

                        <span>КАТАЛОГ <FaCaretDown/> </span>
                        <DropDownMenuCatalog/>

                    </div>

                    <div onClick={clickToAboutUs} id={'about-us-header'} className={'col-3 d-flex-center'}>
                        ПРО НАС
                    </div>

                    <div onClick={clickToFooter} id={'contacts'} className={'col-3 d-flex-center'}>
                        КОНТАКТИ
                    </div>

                </div>

                <div className={'user-menu'}>
                    {!isAuth ?
                        <NavLink to={'logIn'}>ВХІД</NavLink> :

                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle user-down-menu" type="button"
                                id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                aria-expanded="false">

                                {user?.image ?
                                    <img src={user?.image} alt="фото" className="avatar-dropdown"/> :
                                    <div className="avatar-dropdown">{firstLater}</div>
                                }
                                <div className={'user-name'}>{user?.username} {user?.surname}</div>

                            </button>
                            <ul className="dropdown-menu dropdown-user-menu" aria-labelledby="dropdownMenuButton1">
                                <li><NavLink to={'myOffice'}>Особистий кабінет</NavLink></li>
                                <li><NavLink to={'basket'}>До корзини</NavLink></li>
                                <li onClick={logOut} className={'log-out'}>Вийти</li>
                            </ul>
                        </div>

                    }

                </div>

                {isAuth && <NavLink to={'basket'} className={'basket-btn'}><FaShoppingBasket className={'basket-icon'}/>
                </NavLink>}

            </div>

        </div>
    );
};

export { Header };
