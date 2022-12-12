import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import './Layout.css';
import { Header } from '../../components';
import { Footer } from '../../components/Footer/Footer';

const Layout: FC = () => (
    <>

        <Header/>
        <div id={'content-bloc'}>
            <Outlet/>
        </div>
        <Footer/>

    </>
);

export { Layout };
