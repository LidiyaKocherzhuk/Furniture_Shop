import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';

import './CreateProduct.css';
import { CreateBedPrice } from './CreateBedPrice';
import { ProductTextile } from './ProductTextile';
import { ProductMaterials } from './ProductMaterials';
import { ProductValidator } from '../../../../validators/productValidator';
import { productsService } from '../../../../services';
import { IProduct } from '../../../../interfaces';
import { CreateImageComponent } from '../CreateImageComponent/CreateImageComponent';

const CreateProduct: FC = () => {
    const {
        register,
        formState: { errors },
        reset,
    } = useForm({
        resolver: joiResolver(ProductValidator),
        mode: 'onTouched',
    });

    const [kind, setKind] = useState('');
    const [kindError, setKindError] = useState(true);
    const [createdProduct, setCreatedProduct] = useState<IProduct>({
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
        type: '',
    });
    const [materials, setMaterials] = useState<string>('');

    function getKindProduct(e: any) {
        e.preventDefault();
        setKind(e.target.value);

        if (e.target.value) {
            setKindError(false);
        } else {
            setKindError(true);
        }
    }

    const getProductMaterials = (materials: string) => {
        setMaterials(materials);
    };

    const saveProduct = async () => {
        const formElement = document.getElementById('save-product-form') as HTMLFormElement;
        const form = new FormData(formElement);
        form.set('materials', materials);

        const notValue = [];
        for (const [key, value] of form.entries()) {
            if (!value || value == '') {
                notValue.push(key);
            }
        }

        for (const item of notValue) {
            form.delete(item);
        }

        if (!kind) {
            setKindError(true);
        }

        form.set('type', kind);

        const { data } = await productsService.save(form);
        setCreatedProduct(data);

        toggle();
        reset();
    };

    const toggle = () => {
        setTimeout(() => {
            const bedPriseElement = document.getElementsByClassName('additionally')[0];
            bedPriseElement.classList.toggle('show-additionally');
            window.scroll(0, 0);
        }, 200);
    };

    return (
        <div id={'create-product'}>
            <h3 className={'header-h3'}>Додати новий товар:</h3>
            <hr/>

            <div className={'select-bloc'}>
                {kindError && <span><i>Виберіть тип товару!</i> <br/></span>}
                <select name="select" onChange={getKindProduct}>
                    <option value="">Виберіть тип товару</option>
                    <option value="Ліжко">Ліжко</option>
                    <option value="Крісло">Крісло</option>
                    <option value="Диван">Диван</option>
                    <option value='Банкетка'>Банкетка</option>
                    <option value='Тумба'>Тумба</option>
                    <option value='Комод'>Комод</option>
                    <option value='Пуф'>Пуф</option>
                    <option value='Стілець'>Стілець</option>
                    <option value='Лавочка'>Лавочка</option>
                </select>
            </div>

            <form id={'save-product-form'}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <label> Модель виробу: <input type="text" {...register('model')}/></label>
                <ErrorMessage
                    errors={errors}
                    name="model"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <label> Декор(оздоба): <input type="text" {...register('decor')}/></label>
                <ErrorMessage
                    errors={errors}
                    name="decor"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <label> Висота узголів'я від підлоги: <input
                    type="number" {...register('headboardHeight')}/></label>
                <ErrorMessage
                    errors={errors}
                    name="headboardHeight"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <label> Висота боковин: <input
                    type="number" {...register('sidewallsHeight')}/></label>
                <ErrorMessage
                    errors={errors}
                    name="sidewallsHeight"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <label> Габарити: <input
                    type="text" {...register('dimensionsOfTheProduct')}/></label>
                <ErrorMessage
                    errors={errors}
                    name="dimensionsOfTheProduct"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <label> Ніжки: <input type="text" {...register('legs')}/></label>
                <ErrorMessage
                    errors={errors}
                    name="legs"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                {/* <label> Каркас з: <input type="text" {...register('')}/></label> */}
                <label> З підйомним механізмом: <input type="checkbox" {...register('mechanism')}/></label>
                <ErrorMessage
                    errors={errors}
                    name="mechanism"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <label>
                    Ламелевий каркас: <input type={'text'} {...register('slats')}/>
                </label>
                <ErrorMessage
                    errors={errors}
                    name="slats"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <label> Новинка: <input type="checkbox" {...register('isNovelty')}/></label>
                <ErrorMessage
                    errors={errors}
                    name="isNovelty"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <label> Популярне: <input type="checkbox" {...register('isPopular')}/></label>
                <ErrorMessage
                    errors={errors}
                    name="isPopular"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <label> Вартість цього виробу: <span><input
                    type="number" {...register('price')}/>грн.</span></label>
                <ErrorMessage
                    errors={errors}
                    name="price"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <label> Детальніше про виріб: <br/><textarea {...register('anotherDetails')}/></label>
                <ErrorMessage
                    errors={errors}
                    name="anotherDetails"
                    render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                />

                <div id={'create-images-box'}>

                    <CreateImageComponent
                        createBox={'create-images-box'}
                    />

                </div>

            </form>

            <ProductMaterials getProductMaterials={getProductMaterials}/>

            {createdProduct.id
                ? <div className={'additionally'}>
                    <h5>Додайте ще опис</h5>
                    <hr/>

                    <ProductTextile createdProductId={createdProduct.id}/>

                    {kind === 'Ліжко'
                    && <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Додати ціни для інших розмірів виробу
                        </button>
                        <ul className="dropdown-menu">
                            <CreateBedPrice createdProductId={createdProduct.id} anotherPriceForUpdate={undefined}/>
                        </ul>
                    </div>
                    }
                    <button onClick={toggle} className={'toggle-btn'}>ОК</button>
                </div>
                : null
            }

            <button onClick={saveProduct}>Зберегти</button>

        </div>
    );
};

export { CreateProduct };
