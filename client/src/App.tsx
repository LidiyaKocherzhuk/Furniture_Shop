import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { HomePage, AllProductsPage, Layout } from './containers';
import { Registration } from './components/Auth/Registration/Registration';
import { LogIn } from './components/Auth/LogIn/LogIn';
import { ConfirmEmail } from './components/Auth/confirmEmail/ConfirmEmail';
import { useAppDispatch, useAppSelector } from './hooks';
import { checkAuthThank } from './store';
import { CheckIsAuth } from './middlewares/checkIsAuth';
import { Basket } from './components/Header/Basket/Basket';
import { CreateProduct, PersonalOffice, Likes, Meeting, Comments } from './components';
import { ProductDetail } from './components/ProductDetail/ProductDetail';
import { CreateTextile } from './components/PersonalOffice/SuperUser/CreateTextile/CreateTextile';
import { TextilesPage } from './components/TextilesPage/TextilesPage';
import { TextileDetail } from './components/TextilesPage/TextileDetail/TextileDetail';
import { Ordered } from './components/PersonalOffice/Ordered/Ordered';
import { Users } from './components/PersonalOffice/SuperUser/Users/Users';

function App() {
    const { isLoading } = useAppSelector(state => state.authReducer);
    const refreshToken = localStorage.getItem('refreshToken');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (refreshToken) {
            dispatch(checkAuthThank(refreshToken));
        }
    }, []);

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <div className="App">

            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={'allProducts'} element={<AllProductsPage/>}/>
                    <Route path={'productDetail'} element={<ProductDetail/>}/>
                    <Route path={'registration'} element={<Registration/>}/>
                    <Route path={'confirmEmail'} element={<ConfirmEmail/>}/>
                    <Route path={'logIn'} element={<LogIn/>}/>
                    <Route path={'myOffice'} element={<CheckIsAuth><PersonalOffice/></CheckIsAuth>}>
                        <Route path={'newProduct'} element={<CreateProduct/>}/>
                        <Route path={'newTextile'} element={<CreateTextile/>}/>
                        <Route path={'ordered'} element={<Ordered/>}/>
                        <Route path={'myLike'} element={<Likes/>}/>
                        <Route path={'comments'} element={<Comments/>}/>
                        <Route path={'meeting'} element={<Meeting/>}/>
                        <Route path={'users'} element={<Users/>}/>
                    </Route>
                    <Route path={'basket'} element={<Basket/>}/>
                    <Route path={'textiles'} element={<TextilesPage/>}>
                        <Route path={'detail'} element={<TextileDetail/>}/>
                    </Route>
                </Route>
            </Routes>

        </div>
    );
}

export default App;
