import React, { createRef, FC, useState } from 'react';

import './CreateMadeOf.css';
import { madeOfService } from '../../../../services';

const CreateMadeOf:FC = () => {

    const madeOf = createRef<HTMLInputElement>();
    const [empty, setEmpty] = useState(false);

    const saveMadeOf = async () => {
        if (!madeOf.current || madeOf.current.value === '') {
            setEmpty(true);
            return;
        }
        setEmpty(false);
        await madeOfService.save({ material: madeOf.current.value });
    };

    return (
        <div id={'add-madeOf'}>

            <h3 className={'header-h3'}>Додати новий матеріал каркасу:</h3>
            <hr/>

            <div className={'add-madeOf'}>
                <label>Назва матеріалу: <input type="text" ref={madeOf}/></label>
                {empty && <span className={'spanError'}>( Заповніть поле! )</span>}
                <button onClick={saveMadeOf}>Збререгти</button>
            </div>

        </div>
    );
};

export { CreateMadeOf };
