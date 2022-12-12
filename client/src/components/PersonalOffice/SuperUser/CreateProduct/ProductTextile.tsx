import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getAllTextileThank } from '../../../../store/slices/textileSlice';
import { textileProductService } from '../../../../services';

interface dataProps {
    createdProductId: number;
}

const ProductTextile: FC<dataProps> = ({ createdProductId }) => {
    const {
        register,
        handleSubmit,
    } = useForm();

    const { textiles } = useAppSelector((state) => state.textileReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllTextileThank());
    }, []);

    const getChecked = async (data: any) => {
        console.log(data);
        const textiles = [];

        for (const key in data) {
            if (data[key]) {
                textiles.push(Number(data[key]));
            }
        }

        await textileProductService.save({ productId: createdProductId, textiles });
    };

    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Вибрати матеріал оббивки
            </button>
            <ul className="dropdown-menu">
                <div>
                    {textiles.map((textile) => <li key={textile.id} className="form-check-textile">
                        <input className="form-check-textile-input" type="checkbox" {...register(textile.textileName)}
                            value={textile.id}
                            id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {textile.textileName}
                        </label>
                    </li>)}
                    <button onClick={handleSubmit(getChecked)}>Ок</button>
                </div>
            </ul>
        </div>
    );
};

export { ProductTextile };
