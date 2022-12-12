import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IBedPrice, IBedPriceExtends } from '../../../../interfaces';
import { productsService } from '../../../../services';
import { useAppDispatch } from '../../../../hooks';
import { setProducts } from '../../../../store';

interface dataFormProps {
    createdProductId: number;
    anotherPriceForUpdate?: IBedPriceExtends[];
    userId?: number;
    closeBloc?: () => any;
}

const CreateBedPrice: FC<dataFormProps> = ({
    createdProductId, anotherPriceForUpdate, userId, closeBloc,
}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { dirtyFields },
    } = useForm<IBedPrice>();
    const dispatch = useAppDispatch();

    const [updateProductId, setUpdateProductId] = useState<number | null>(null);

    useEffect(() => {
        if (anotherPriceForUpdate) {
            const {
                id, size140_200, size160_200, size180_200, size200_200,
            } = anotherPriceForUpdate[0];
            setUpdateProductId(id);

            setValue('size140_200', size140_200);
            setValue('size160_200', size160_200);
            setValue('size180_200', size180_200);
            setValue('size200_200', size200_200);
        }
    }, [anotherPriceForUpdate]);

    const getData = async (formData: IBedPrice) => {
        // for (const [key, value] of Object.entries(formData)) {
        //     if (!value) {
        //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //         // @ts-ignore
        //         delete formData[key];
        //     }
        // }

        const dirtyData = {};

        for (const [key, value] of Object.entries(dirtyFields)) {
            if (value) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                dirtyData[key] = formData[key];
            }
        }

        if (updateProductId && userId) {
            console.log(dirtyData);
            const { data } = await productsService.updateBedPrice(updateProductId, userId, dirtyData);
            console.log(data);
            dispatch(setProducts({ products: data }));
        } else {
            const { data } = await productsService.saveBedPrice({ ...dirtyData, bedId: createdProductId });
            console.log(data);
            dispatch(setProducts({ products: data }));
        }

        if (closeBloc) {
            closeBloc();
        }
    };

    return (
        <div>
            <div id={'bed-price'}>
                <label>
                    Вартість ліжка у розмірі 140*200см: <div className="input-group mb-3">
                        <span className="input-group-text">	&#8372; </span>
                        <input type="number" {...register('size140_200')} className="form-control"
                            aria-label="Amount (to the nearest dollar)"/>
                    </div>
                </label>
                <label>
                    Вартість ліжка у розмірі 160*200см: <div className="input-group mb-3">
                        <span className="input-group-text">	&#8372; </span>
                        <input type="number" {...register('size160_200')} className="form-control"
                            aria-label="Amount (to the nearest dollar)"/>
                    </div>
                </label>
                <label>
                    Вартість ліжка у розмірі 180*200см: <div className="input-group mb-3">
                        <span className="input-group-text">	&#8372; </span>
                        <input type="number" {...register('size180_200')} className="form-control"
                            aria-label="Amount (to the nearest dollar)"/>
                    </div>
                </label>
                <label>
                    Вартість ліжка у розмірі 200*200см: <div className="input-group mb-3">
                        <span className="input-group-text">	&#8372; </span>
                        <input type="number" {...register('size200_200')} className="form-control"
                            aria-label="Amount (to the nearest dollar)"/>
                    </div>
                </label>

                <button onClick={handleSubmit(getData)}>Зберегти</button>

            </div>

        </div>
    );
};

export { CreateBedPrice };
