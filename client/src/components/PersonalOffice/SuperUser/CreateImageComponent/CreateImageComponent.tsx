import React, { FC } from 'react';

import './CreateImageComponent.css';

interface IProps {
    createBox: string;
}

const CreateImageComponent:FC<IProps> = ({ createBox }) => {
    const generateImageInputs = (e: any) => {
        e.preventDefault();

        const formElement = document.getElementById(createBox);
        const inputElement = document.getElementById('input-image-element');

        if (formElement && inputElement) {
            const labelElement = document.createElement('image-label');
            const clearButton = document.createElement('button');
            const input = inputElement.cloneNode(false) as HTMLInputElement;

            clearButton.classList.add('clearButton');
            clearButton.innerHTML = 'X';
            input.value = '';

            labelElement.append(input, clearButton);
            formElement.appendChild(labelElement);

            clearButton.onclick = (e: any) => {
                e.preventDefault();
                e.target.parentElement.remove();
            };
        }
    };

    return (
        <div id={'file-element'} className={'fileElement'}> Фото товару:
            <input id={'input-image-element'} type="file" name={'image'}/>

            <button onClick={generateImageInputs}>додати ще зображення</button>
        </div>
    );
};

export { CreateImageComponent };
