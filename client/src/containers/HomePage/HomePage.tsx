import React, { FC, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { Popular, SlideMenu } from '../../components';
import { AboutUs } from '../../components/AboutUs/AboutUs';

const HomePage: FC = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const aboutUsElement = document.getElementById(location.state as string) as HTMLElement;
            window.scroll(0, aboutUsElement.offsetTop);
            return;
        }
        window.scroll(0, 0);
    }, [location.state]);

    return (
        <div className={'homePage'}>
            <SlideMenu/>
            <Popular/>
            <AboutUs/>
        </div>
    );
};

export { HomePage };
