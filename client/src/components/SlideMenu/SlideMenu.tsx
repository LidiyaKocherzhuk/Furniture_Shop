import React, { FC, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight , FiPlus } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import { BsX } from 'react-icons/bs';

import './SlideMenu.css'
import { Slide } from './Slide';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllImagesThunk, updateImageThunk } from '../../store';
import { DesignManagement } from '../PersonalOffice';

const SlideMenu: FC = () => {

    const role = localStorage.getItem('role');
    const { sliceImages } = useAppSelector(state => state.imagesReducer);
    const { register, handleSubmit, setValue } = useForm();
    const dispatch = useAppDispatch();

    const [imageId, setImageId] = useState(0);

    useEffect(() => {
        dispatch(getAllImagesThunk());
    }, []);

    const getImageId = (id: number, description: string | undefined): void => {
        setImageId(id);
        setValue('description', description);
    }

    const updateImage = () => {
        const data = document.getElementById('update-image_form') as HTMLFormElement;
        const bloc = document.getElementsByClassName('update-image_hide_bloc')[0] as HTMLDivElement;
        const form = new FormData(data);

        form.set('id', imageId.toString())
        form.set('location', 'slides')
        dispatch(updateImageThunk(form))

        bloc.classList.toggle('update-image_show_bloc')
    }

    const closeBloc = () => {
        const bloc = document.getElementsByClassName('update-image_hide_bloc')[0] as HTMLDivElement;
        bloc.classList.toggle('update-image_show_bloc')
    }

    const addSlide = () => {
        const addSlideElement = document.getElementsByClassName('add-slide')[0] as HTMLDivElement;
        addSlideElement.classList.toggle('show-add-slide');
    };

    if (sliceImages.length) {
        return (
            <div id={'carousel-menu'}>

                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">

                        {sliceImages.map(image => <div key={image.id}>
                            { image.location === 'slides' ?
                                <Slide item={image} getImageId={getImageId}/>
                                : null
                            }
                        </div>
                        )}

                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                        <span className="icon-prev" aria-hidden="true">
                            <FiChevronLeft className={'icon'}/>
                        </span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="next">
                        <span className=" icon-next" aria-hidden="true">
                            <FiChevronRight className={'icon'}/>
                        </span>
                        <span className="visually-hidden ">Next</span>
                    </button>
                </div>

                <div className={'update-image_hide_bloc'}>
                    <BsX onClick={closeBloc} className={'btn-close'}/>
                    <h4>Нове зображення</h4>
                    <form onSubmit={handleSubmit(updateImage)} id={'update-image_form'}>
                        <label>Надпис в центрі слайд зображення: <br/><input type={'text'} {...register('description')}/></label>
                        <label>Зображення: <br/><input type={'file'} {...register('files')}/></label>
                        <button>Зберегти</button>
                    </form>
                </div>

                {role === 'superUser' &&<FiPlus onClick={addSlide} className={'add-slide-btn'}/>}

                <div className={'add-slide'}>
                    <BsX onClick={addSlide} className={'btn-close'}/>
                    <DesignManagement from={'plusOne'}/>
                </div>


            </div>
        );
    }

    if (role === 'superUser') {
        return (
            <div>
                <DesignManagement/>
                <hr/>
            </div>
        );
    }

    return (
        <div>

        </div>
    )
};

export { SlideMenu };
