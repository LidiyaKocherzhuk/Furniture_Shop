import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ImStarEmpty } from 'react-icons/im';
import { BsFillTrashFill, BsHeart, BsPencilFill } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaTelegramPlane } from 'react-icons/fa';

import './ProductDetail.css';
import { IProduct, IUserFromStorage } from '../../interfaces';
import { basketService, productsService , isLikeService } from '../../services';
import { MeetingBloc } from './MeetingBloc/MeetingBloc';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getByParamsTextileThank } from '../../store/slices/textileSlice';
import { UpdateProduct , UpdateProductPrice , UpdateProductImages } from './UpdateProduct';
import { SocketComments } from './SocketComments/SocketComments';

interface ILocationState {
    product?: IProduct;
    productId?: number;
}

const ProductDetail: FC = () => {

    const userFromStorage = localStorage.getItem('isAuth');
    const role = localStorage.getItem('role');
    const [userData, setUserData] = useState<IUserFromStorage>({ id: 0, basket: [], likes: [] });

    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [image, setImage] = useState('')
    const [product, setProduct] = useState<IProduct>({
        anotherDetails: '',
        createdAt: '',
        decor: '',
        deletedAt: '',
        dimensionsOfTheProduct: '',
        headboardHeight: '',
        id: 0,
        images: [],
        isNovelty: '',
        isPopular: '',
        legs: '',
        materials: '',
        mechanism: '',
        model: '',
        price: '',
        priceForAnotherSize: [],
        sidewallsHeight: '',
        slats: '',
        textiles: [],
        type: ''
    });
    const { productTextile } = useAppSelector(state => state.textileReducer);
    const [thisLike, setThisLike] = useState(false);

    const {
        id,
        anotherDetails,
        decor,
        dimensionsOfTheProduct,
        headboardHeight,
        images,
        isNovelty,
        isPopular,
        legs,
        materials,
        mechanism,
        model,
        price,
        sidewallsHeight,
        slats,
        type,
        textiles,
        priceForAnotherSize,
    } = product;
    console.log(location.state);

    useEffect(() => {
        window.scroll(0, 0)
        if (userFromStorage) {
            const { id, basket, likes } = JSON.parse(userFromStorage);
            setUserData({ id, basket, likes });
        }
    }, []);

    useEffect(() => {
        const isLike = userData.likes.find(item => item.productId === product.id);
        if (!isLike) {
            return;
        }
        setThisLike(true);

    }, [])

    useEffect(() => {
        const { product, productId } = location.state as ILocationState;

        if (product) {
            setProduct(product);
            return;
        }
        if (productId) {
            productsService.getById(productId)
                .then(value => setProduct(value.data));
            return;
        }
        return;
    }, [location.state])

    useEffect(() => {
        if (!images.length) {
            setImage('https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg')
            return;
        }
        setImage(images[0].image)
    }, [images.length])

    useEffect(() => {
        if (textiles.length) {
            textiles.forEach(textile => dispatch(getByParamsTextileThank({ id: textile.textileId }))
            )
        }
        return;
    }, [])

    const setToBasket = async () => {
        await basketService.save({
            userId: userData.id,
            productId: product.id,
            productCountPrice: Number(product.price),
            productCount: 1,
        });
    }

    const setToLike = async () => {
        if (!thisLike) {
            setThisLike(true);
            const { data } = await isLikeService.save({ userId: userData.id, productId: product.id, isLike: true });
            localStorage.setItem('isAuth', JSON.stringify(data));
            return;
        }
        setThisLike(false);
        await isLikeService.delete({ userId: userData.id, productId: product.id })
    }

    const getMeetingBloc = () => {
        const meetingBloc = document.getElementsByClassName('meetingBloc')[0];
        meetingBloc.classList.toggle('meetingBlocShow');
    }

    const updateProduct = (updateParams: string): (event: React.MouseEvent) => Promise<void> => {
        return async (event: React.MouseEvent) => {
            event.preventDefault();

            if (updateParams === 'product') {
                const updateBloc = document.getElementsByClassName('update-product')[0];
                updateBloc.classList.toggle('update-productShow');
            } else if (updateParams === 'image') {
                const updateImageBloc = document.getElementsByClassName('update-image')[0] as HTMLElement;
                updateImageBloc.classList.toggle('update-image-show');
            } else if (updateParams === 'price') {
                const updatePriceBloc = document.getElementsByClassName('update-product-price')[0] as HTMLElement;
                updatePriceBloc.classList.toggle('update-product-priceShow');
            }

        }
    }

    const deleteProduct = async () => {
        navigate(-1);
        await productsService.deleteById(id, userData.id);

    }

    console.log('detaillll')

    return (
        <div id={'product-detail'}>
            <h3>{type} {model}</h3>
            <hr/>
            <div className={'detail'}>

                <div className={'left-bloc-detail'}>

                    <div className={'images'}>

                        <div className={'images-left-bloc'}>{images.map(item =>
                            <button onClick={() => setImage(item.image)} key={item.id}>
                                <img src={item.image} alt="image"/>
                            </button>)}
                        </div>

                        <img className={'image-right'} src={image} alt="image"/>

                        {role === 'superUser' &&
                        <BsPencilFill onClick={updateProduct('image')} className={'update-product-btn'}/>
                        }

                    </div>

                    <hr/>
                    <div className={'description-left'}>
                        <h5>Опис виробу</h5>
                        {dimensionsOfTheProduct && <h6>Розміри - {dimensionsOfTheProduct} см.</h6>}
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        {headboardHeight && <h6>Висота узголів'я від підлоги - {headboardHeight} см.</h6>}
                        {sidewallsHeight && <h6>Боковини - {sidewallsHeight} см.</h6>}
                        {legs && <h6>Ніжки - {legs}</h6>}
                        {materials && <h6>Каркас ліжка: - {materials}</h6>}
                        {mechanism && <h6>Підйомний механізм - так </h6>}
                        {slats && <h6>Ламелевий каркас: {slats}</h6>}
                        {decor && <h6>Декор - {decor}</h6>}

                        {productTextile.length ?
                            <h6>Оббивка - {productTextile.map(textile =>
                                <span key={textile.id}>
                                    {textile.textileName},
                                </span>)}
                            </h6> : null
                        }
                        {anotherDetails && <h6>{anotherDetails}</h6>}

                        {role === 'superUser' &&
                        <BsPencilFill onClick={updateProduct('product')} className={'update-product-btn'}/>
                        }
                    </div>

                    {priceForAnotherSize.length ?

                        <div className={'another-price'}>
                            <hr/>
                            <h5>Інша вартість:</h5>
                            {priceForAnotherSize[0].size140_200 ?
                                <h6>Спальне місце 140*200 - <span>{priceForAnotherSize[0].size140_200}грн.</span></h6>
                                : null
                            }
                            {priceForAnotherSize[0].size160_200 ?
                                <h6>Спальне місце 160*200 - <span>{priceForAnotherSize[0].size160_200}грн.</span></h6>
                                : null
                            }
                            {priceForAnotherSize[0].size180_200 ?
                                <h6>Спальне місце 180*200 - <span>{priceForAnotherSize[0].size180_200}грн.</span></h6>
                                : null
                            }
                            {priceForAnotherSize[0].size200_200 ?
                                <h6>Спальне місце 200*200 - <span>{priceForAnotherSize[0].size200_200}грн.</span></h6>
                                : null
                            }

                            {role === 'superUser' &&
                            <BsPencilFill onClick={updateProduct('price')} className={'update-product-btn'}/>
                            }

                        </div>

                        : (type === 'Ліжко' ? <div className={'add-anotherPrice'}>
                            {role === 'superUser' &&

                                    <span onClick={updateProduct('price')}>
                                додати вартість інших розмірів <BsPencilFill/>
                                    </span>

                            }
                        </div>
                            : null
                        )

                    }

                    <hr/>

                    <SocketComments product={product}/>
                </div>

                <div className={'description-right'}>
                    <h4>{type} {model}</h4>
                    {isNovelty && <div className={'new-popular-item'}><ImStarEmpty/> Новинка</div>}
                    {isPopular && <div className={'new-popular-item'}><ImStarEmpty/> Популярне</div>}

                    <span>Під замовлення!</span>
                    <h4>{price} грн.</h4>

                    <button onClick={setToBasket}>У Корзину</button>

                    <div onClick={setToLike} className={'like-btn'}>
                        <BsHeart/>
                        {thisLike ? ' Видалити зі списку бажань' : ' У список бажань'}
                    </div>


                    {role === 'superUser' &&
                    <button onClick={deleteProduct}><BsFillTrashFill/> Видалити товар</button>
                    }

                    <hr/>

                    <div className={'detail-contacts'}>
                        <h5>Бажаєте дізнатьсь більше?</h5>

                        <div>
                            <h6>Зателефонуйте нам!</h6>
                            <h6>📞+38097 835 5758</h6>
                        </div>

                        <div>
                            <h6>Або виберіть зручний час для зустрічі</h6>
                            <button onClick={getMeetingBloc}>Вибрати час</button>
                        </div>

                        <div>
                            <h6>Також можете знайти на у соц-мережах</h6>
                            <div className={'networks-icons'}>
                                <a href="https://www.instagram.com/soft.life.lviv/"><FaInstagram
                                    className={'FaInstagram'}/></a>
                                <a href="https://www.facebook.com/soft.life.lviv"><FaFacebookF
                                    className={'FaFacebookF'}/></a>
                                <a href="https://t.me/Lidiya_Kocherzhuk"><FaTelegramPlane
                                    className={'FaTelegramPlane'}/></a>
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <div>
                        <h5>Доставка</h5>
                        <h6>✅Доставка та монтаж - НЕ ВХОДЯТЬ У ВАРТІСТЬ❗:
                            <ul>
                                <li>по Львові доставляємо і монтуємо;</li>
                                <li>по Україні відправка: службою Делівері або Новою поштою (у розібраному вигляді -
                                    надсилаємо відео-інструкцію), надійно запаковуємо.
                                </li>
                            </ul>
                        </h6>
                    </div>

                </div>

                <MeetingBloc productId={id}/>

                <UpdateProductImages productForUpdate={product} userId={userData.id} whatUpdate={'product'}/>
                <UpdateProduct productForUpdate={product} userId={userData.id}/>
                <UpdateProductPrice product={product} userId={userData.id}/>

            </div>

        </div>
    );
};

export { ProductDetail };
