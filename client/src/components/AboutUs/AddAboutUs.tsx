import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { BsX } from 'react-icons/bs';

import './AddAboutUs.css';
import { saveImageThunk } from '../../store';
import { useAppDispatch } from '../../hooks';

const AddAboutUs:FC = () => {
    const dispatch = useAppDispatch();
    const { handleSubmit } = useForm()

    const saveData = () => {
        const  data = document.getElementById('add-aboutUs-images') as HTMLFormElement
        const form = new FormData(data);
        form.set('location', 'aboutUs');
        console.log(form);

        dispatch(saveImageThunk(form));
    }

    const closeAddMenu = () => {
        const logoElement = document.getElementsByClassName('add-about-us')[0] as HTMLFormElement;
        logoElement.classList.toggle('show-add-about-us');
    };

    return (
        <div className={'add-about-us'}>
            <h3>Додайте інформацію про вас</h3>
            <form onSubmit={handleSubmit(saveData)} id={'add-aboutUs-images'}>

                <label>Про вас: <br/><textarea name={'description'}/></label>
                <label>Фото: <input type="file" name={'image'}/></label>

                <button>Зберегти</button>
                <BsX onClick={closeAddMenu} className={'aboutUs-close-btn'}/>
            </form>
        </div>
    );
};

export { AddAboutUs };
