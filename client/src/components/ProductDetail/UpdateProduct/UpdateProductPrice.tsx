import React, { FC } from 'react';
import { BsX } from 'react-icons/bs';

import './UpdateProductPrice.css'
import { CreateBedPrice } from '../../PersonalOffice';
import { IProduct } from '../../../interfaces';

interface IProps {
    product: IProduct;
    userId:number;
}

const UpdateProductPrice:FC<IProps> = ({ product, userId }) => {

    const { id, priceForAnotherSize } = product;

    const closeUpdateMenu = () => {
        const updatePriceBloc = document.getElementsByClassName('update-product-price')[0];
        updatePriceBloc.classList.toggle('update-product-priceShow');
    }

    return (
        <div className={'update-product-price'}>


            {
                priceForAnotherSize.length ?
                    <CreateBedPrice
                        createdProductId={id}
                        anotherPriceForUpdate={priceForAnotherSize}
                        userId={userId}
                        closeBloc={closeUpdateMenu}
                    />
                    :
                    <CreateBedPrice
                        createdProductId={id}
                        anotherPriceForUpdate={undefined}
                        userId={userId}
                        closeBloc={closeUpdateMenu}
                    />
            }

            <BsX onClick={closeUpdateMenu} className={'close-updateBloc-btn'}/>

        </div>
    );
};

export { UpdateProductPrice };
