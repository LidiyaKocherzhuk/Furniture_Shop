import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { joiResolver } from '@hookform/resolvers/joi';
import { BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import './UpdateProduct.css';
import { IProduct } from '../../../interfaces';
import { productsService } from '../../../services';
import { ProductValidator } from '../../../validators/productValidator';

interface IProps {
    productForUpdate: IProduct;
    userId: number;
}

type FormUpdate = {
    model?: string;
    slats?: string;
    decor?: string;
    price?: string;
    headboardHeight?: string;
    sidewallsHeight?: string;
    dimensionsOfTheProduct?: string;
    legs?: string;
    mechanism?: boolean;
    isNovelty?: boolean;
    isPopular?: boolean;
    anotherDetails?: string;
    materials?: string;
}

const UpdateProduct:FC<IProps> = ({ productForUpdate, userId }) => {

    const {
        mechanism,
        isPopular,
        isNovelty,
        model,
        type,
        id,
    } = productForUpdate;


    const { register, handleSubmit, formState: { errors, dirtyFields }, setValue, } = useForm<FormUpdate>({
        resolver: joiResolver(ProductValidator)
    });

    const navigate = useNavigate();

    useEffect(() => {

        for (const [key, value] of Object.entries(productForUpdate)) {

            if (value) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setValue(`${key}`, value);
            }

        }

        setValue('mechanism', !!mechanism)
        setValue('isNovelty', !!isNovelty)
        setValue('isPopular', !!isPopular)

    },[id])


    const saveProduct = async (formData: FormUpdate) => {
        const dirtyData = {};

        for (const [key, value] of Object.entries(dirtyFields)) {

            if (value) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dirtyData[key] = formData[key];
            }

        }

        const { data } = await productsService.updateById(id, userId, dirtyData).then();
        navigate('/productDetail', { state:{ product: data } });

        closeUpdateMenu();
    }

    const closeUpdateMenu = () => {
        const updateBloc = document.getElementsByClassName('update-product')[0];
        updateBloc.classList.toggle('update-productShow');
    }

    return (
        <div className={'update-product'}>
            <h3 className={'header-h3'}>Оновити {type} {model}</h3>

            <div className={'form-content'}>

                <form id={'update-product-form'}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <label> Модель виробу: <input type="text" {...register('model')}/></label>
                    <ErrorMessage
                        errors={errors}
                        name="model"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <label> Декор(оздоба): <br/><textarea {...register('decor')}/></label>
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

                    {/*<label> Каркас з: <input type="text" {...register('')}/></label>*/}
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

                    <label> Вартість цього виробу: <input
                        type="text" {...register('price')}/>грн.</label>
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


                </form>

                <button onClick={handleSubmit(saveProduct)}>Зберегти</button>
                <BsX onClick={closeUpdateMenu} className={'close-updateBloc-btn'}/>
            </div>

        </div>
    );
};


export { UpdateProduct };
