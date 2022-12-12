import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getAllMaterialThank } from '../../../../store';

interface dataProps {
    getProductMaterials: (materials: string) => void,
}

const ProductMaterials: FC<dataProps> = ({ getProductMaterials }) => {
    const {
        register,
        handleSubmit,
    } = useForm();
    const { materials } = useAppSelector(state => state.productReducer)
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<number[]>([]);

    useEffect(() => {
        dispatch(getAllMaterialThank());
    }, []);

    function getChecked(data: any) {
        const dataValue = [];
        for (const key in data) {
            if (data[key]) {
                dataValue.push(data[key])
            }
        }
        console.log(data);
        console.log(dataValue);
        setValue( dataValue );
    }

    getProductMaterials(value.toString());

    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                Вибрати матеріал каркасу
            </button>
            <ul className="dropdown-menu">
                <div>
                    {materials.map(material =>  <li key={material.id} className="form-check">
                        <input className="form-check-input" type="checkbox" {...register(material.material)}
                            value={material.material}
                            id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            {material.material}{material.id}
                        </label>
                    </li>)}
                    <button onClick={handleSubmit(getChecked)}>Ок</button>
                </div>
            </ul>
        </div>
    );
};

export { ProductMaterials };
