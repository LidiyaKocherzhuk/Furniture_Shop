import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './DropDownMenuCatalog.css';

const DropDownMenuCatalog: FC = () => (
    <div className={'down-menu'}>
        <NavLink
            to={'/allProducts'}
            state={{ productType: 'Ліжко' }}>
            <img src="https://www.happybeds.co.uk/cdn-cgi/image/fit=contain,f=auto,width=1000/media/catalog/product/cache/2760f187cb7d1bcdeca5818f247800d3/f/e/fenton_grey_ottoman_2.jpg"
                alt=""/>Ліжка</NavLink>
        <NavLink
            to={'/allProducts'}
            state={{ productType: 'Диван' }}>
            <img src="https://www.ruparupa.com/blog/wp-content/uploads/2022/01/image6.jpeg"
                alt=""/>Дивани</NavLink>
        <NavLink
            to={'/allProducts'}
            state={{ productType: 'Банкетка' }}>
            <img src="https://shoploft.com.ua/files/products/new-mebel_85301_shoploft.com.ua.625xw.jpg?1660574418"
                alt=""/>Банкетки</NavLink>
        <NavLink
            to={'/allProducts'}
            state={{ productType: 'Тумба' }}>
            <img src="https://img.mebelok.com/image/cache/data/Vistavka/s-bajana/bella-tumba-prikrovatnaya-820x820.jpg.webp"
                alt=""/>Тумби</NavLink>
        <NavLink
            to={'/allProducts'}
            state={{ productType: 'Комод' }}>
            <img src="https://fenster.ua/resize/products/komod-oks-2-cacao.800x800.jpg"
                alt=""/>Комоди</NavLink>
        <NavLink
            to={'/allProducts'}
            state={{ productType: 'Пуф' }}>
            <img src="https://roni.com.ua/m/goods/gl/puf%20corno%20temno-zelenyy%2042%20%2042%20halmar.jpg"
                alt=""/>Пуфи</NavLink>
        <NavLink
            to={'/allProducts'}
            state={{ productType: 'Крісло' }}>
            <img src="https://concepto.com.ua/image/catalog/products/Nicolas/Chairs/viena/_mg_9330.jpg"
                alt=""/>Крісла</NavLink>
        <NavLink
            to={'/allProducts'}
            state={{ productType: 'Стілець' }}>
            <img src="https://www.lori.com.ua/wp-content/uploads/2020/07/DSCF0068-scaled.jpg"
                alt=""/>Стільці</NavLink>
        <NavLink
            to={'/allProducts'}
            state={{ productType: 'Лавочка' }}>
            <img src="https://opt-mebli.com.ua/content/images/35/1122x1122l80mc0/puf-sunduk-azurro-zelenyy-signal-92843168494424.jpg"
                alt=""/>Лавочки</NavLink>
        <NavLink
            to={'/textiles'}>
            <img src="https://cdn.xxl.thumbs.canstockphoto.com/colorful-fabric-rolls-several-different-colorful-fabric-socks-rolls-picture_csp3595587.jpg"
                alt=""/>Тканити</NavLink>
    </div>
);

export { DropDownMenuCatalog };
