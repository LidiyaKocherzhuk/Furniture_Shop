import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { ErrorMessage } from '@hookform/error-message';
import { BsX } from 'react-icons/bs';

import './CreateTextile.css'
import { CreateImageComponent } from '../CreateImageComponent/CreateImageComponent';
import { useAppDispatch } from '../../../../hooks';
import { saveTextileThank, setTextiles } from '../../../../store/slices/textileSlice';
import { TextileValidator } from '../../../../validators/textileValidator';
import { ITextileExtends } from '../../../../interfaces';
import { textileService } from '../../../../services';
import { CreateMadeOf } from '../CreateMadeOf/CreateMadeOf';

type TextileForm = {
    textileName: string,
    manufacturer: string,
    types: string,
    numberOfShades?: string,
    antiClaw?: boolean,
    waterRepellent?: boolean,
    easyToCare?: boolean,
    durability?: string,
    anotherDetails?: string,
}

interface IProps {
    textileForUpdate?: ITextileExtends;
    userId?: number;
}

const CreateTextile:FC<IProps> = ({ textileForUpdate, userId }) => {

    const { register, handleSubmit, formState: { errors, dirtyFields }, setValue, reset } = useForm<TextileForm>({
        resolver: joiResolver(TextileValidator),
    })
    const dispatch = useAppDispatch();

    const [textileId, setTextileId] = useState<number>(0);

    useEffect(() => {
        if (textileForUpdate) {
            const {
                id,
                textileName,
                types,
                numberOfShades,
                manufacturer,
                durability,
                anotherDetails,
                antiClaw,
                waterRepellent,
                easyToCare,
            } = textileForUpdate;

            setTextileId(id);

            setValue('textileName', textileName);
            setValue('types', types);
            setValue('numberOfShades', numberOfShades);
            setValue('manufacturer', manufacturer);
            setValue('durability', durability);
            setValue('anotherDetails', anotherDetails);
            setValue('antiClaw', !!antiClaw);
            setValue('waterRepellent', !!waterRepellent);
            setValue('easyToCare', !!easyToCare);
        }
    },[textileForUpdate]);


    const saveTextile = () => {
        const formElement = document.getElementById('textile-form') as HTMLFormElement;
        const form = new FormData(formElement);

        dispatch(saveTextileThank(form));
        reset();
    };

    const updateTextile = async (formData: TextileForm) => {
        const dirtyData = {};

        for (const [key, value] of Object.entries(dirtyFields)) {

            if (value) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dirtyData[key] = formData[key];
            }

        }

        if (userId) {
            const { data } = await textileService.update(textileId, userId, dirtyData);
            dispatch(setTextiles({ textiles: data }))
        }

        closeUpdateMenu();
        reset();

        const textileDetailElement = document.getElementsByClassName('textile-detail')[0] as HTMLElement;
        textileDetailElement.classList.toggle('textile-detail-show');
    };

    const closeUpdateMenu = () => {
        const textileDetailElement = document.getElementsByClassName('update-textile')[0] as HTMLElement;
        textileDetailElement.classList.toggle('update-textile-show');
    };

    return (
        <div id={'add-textile'}>

            <h3 className={'header-h3'}>Додати новий матеріал оббивки:</h3>
            <hr/>

            <div className={'add-textile'}>
                <form id={'textile-form'}>
                    <label> Назва матеріалу: <input type="text" {...register('textileName')}/></label>
                    <ErrorMessage
                        errors={errors}
                        name="textileName"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <label> Виробник: <input type="text" {...register('manufacturer')}/></label>
                    <ErrorMessage
                        errors={errors}
                        name="manufacturer"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <label> Тип матеріалу: <input type="text" {...register('types')}/></label>
                    <ErrorMessage
                        errors={errors}
                        name="types"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <label> Кількість відтінків: <input type="number" defaultValue={0} {...register('numberOfShades')}/></label>
                    <ErrorMessage
                        errors={errors}
                        name="numberOfShades"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <label> Антикіготь: <input type="checkbox" {...register('antiClaw')}/></label>
                    <ErrorMessage
                        errors={errors}
                        name="antiClaw"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <label> Водостійкий: <input type="checkbox" {...register('waterRepellent')}/></label>
                    <ErrorMessage
                        errors={errors}
                        name="waterRepellent"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <label> Легкий у догляді: <input type="checkbox" {...register('easyToCare')}/></label>
                    <ErrorMessage
                        errors={errors}
                        name="easyToCare"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <label> Зносостійкість: <input type="text" {...register('durability')}/></label>
                    <ErrorMessage
                        errors={errors}
                        name="durability"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />

                    <label> Інші деталі: <input type="text" {...register('anotherDetails')}/></label>
                    <ErrorMessage
                        errors={errors}
                        name="anotherDetails"
                        render={({ message }) => <span className={'spanError'}>( {message} )</span>}
                    />


                    {!textileForUpdate && <div id={'create-imagesTextile-box'}>

                        <CreateImageComponent
                            createBox={'create-imagesTextile-box'}
                        />

                    </div>}

                    <button onClick={
                        textileForUpdate ?
                            handleSubmit(updateTextile)
                            : handleSubmit(saveTextile)
                    }>Зберегти</button>

                </form>

            </div>

            {textileForUpdate &&
            <BsX onClick={closeUpdateMenu} className={'close-btn-update_textile'}/>
            }

            <CreateMadeOf/>

        </div>
    );
};

export { CreateTextile };
