import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsX } from 'react-icons/bs';

import './UpdateProductImages.css';
import { productsService, textileService } from '../../../services';
import { IImage, IProduct, ITextileExtends } from '../../../interfaces';
import { CreateImageComponent } from '../../PersonalOffice/SuperUser/CreateImageComponent/CreateImageComponent';
import { useAppDispatch } from '../../../hooks';
import { setTextiles } from '../../../store/slices/textileSlice';
import { setProducts } from '../../../store';

interface IProps {
    productForUpdate: IProduct | ITextileExtends;
    userId: number;
    whatUpdate: string;
}

const UpdateProductImages:FC<IProps> = ({ productForUpdate, userId, whatUpdate }) => {

    const { id, images } = productForUpdate;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [productImages, setProductImages] = useState<IImage[]>([])

    useEffect(() => {
        setProductImages(images);
    },[productForUpdate])

    const deleteImage = async (id: number) => {
        setProductImages(productImages.filter(image => image.id !== id));

        if (whatUpdate === 'textile') {
            await textileService.deleteImage(id, userId).then();
            return;
        }

        await productsService.deleteImage(id, userId).then();
    }

    const saveNewImages = async () => {
        const newImagesForm = document.getElementById('add-new-image') as HTMLFormElement;
        const form = new FormData(newImagesForm);


        if (whatUpdate === 'textile') {
            console.log('updptext')
            const { data } = await textileService.updateImages(id, userId, form).then();
            dispatch(setTextiles({ textiles: data }));

            const updatedTextile = await data.find((textile: ITextileExtends) => textile.id === id);
            await navigate('/textiles/detail', { state: { textile: updatedTextile } });

        } else {
            console.log('updproduct')
            const { data } = await productsService.updateImages(id, userId, new FormData(newImagesForm)).then();
            dispatch(setProducts({ products: data }))
            console.log(data);

            const updatedProduct = data.find((product: IProduct) => product.id === id);
            navigate('/productDetail', { state: { product: updatedProduct } })
        }

        console.log(whatUpdate);
        closeUpdateMenu();

        newImagesForm.image.value = '';
    };

    const closeUpdateMenu = () => {
        const updateImageBloc = document.getElementsByClassName('update-image')[0] as HTMLElement;
        updateImageBloc.classList.toggle('update-image-show');
    }

    return (

        <div className={'update-image'}>

            {productImages && <h5>Видалити існуючі:</h5>}
            <div className={'old-images'}>
                {productImages && productImages.map(image => <div key={image.id} className={'delete-image'}>

                    <img src={image.image} alt=""/>
                    <button onClick={(e) => {
                        e.preventDefault();
                        productsService.deleteImage(image.id, userId).then();
                        deleteImage(image.id);
                    }}>Видалити
                    </button>

                </div>
                )}
            </div>

            <hr/>
            <h5>Додати нові:</h5>

            <form id={'add-new-image'}>

                <CreateImageComponent
                    createBox={'add-new-image'}
                />

            </form>

            <button onClick={saveNewImages}>Зберегти</button>
            <BsX onClick={closeUpdateMenu} className={'close-updateBloc-btn'}/>

        </div>
    );
};

export { UpdateProductImages };
