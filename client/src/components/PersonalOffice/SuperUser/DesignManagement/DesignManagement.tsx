import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import './DesignManagement.css'
import { useAppDispatch } from '../../../../hooks';
import { saveImageThunk } from '../../../../store';
import { CreateImageComponent } from '../CreateImageComponent/CreateImageComponent';

const DesignManagement: FC<{from?: string}> = ({ from }) => {
    const { handleSubmit } = useForm()
    const dispatch = useAppDispatch();

    const saveData = () => {
        const  data = document.getElementById('add-slide-images') as HTMLFormElement
        const form = new FormData(data);
        form.set('location', 'slides');

        dispatch(saveImageThunk(form));

        if (from === 'plusOne') {
            const addSlideElement = document.getElementsByClassName('add-slide')[0] as HTMLDivElement;
            addSlideElement.classList.toggle('show-add-slide');
        }
    }

    return (
        <div className={'add-images'}>

            <h3>Додайте декілька фото для слайдів</h3>

            <form onSubmit={handleSubmit(saveData)} id={'add-slide-images'}>

                <div id={'slide-images'}>
                    <CreateImageComponent createBox={'slide-images'}/>
                </div>

                <button>Зберегти</button>
            </form>

        </div>
    );
};

export { DesignManagement };
