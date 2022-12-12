import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsPencilFill, BsX } from 'react-icons/bs';

import './TextileDetail.css';
import { ITextileExtends } from '../../../interfaces';
import { textileService } from '../../../services';
import { useAppDispatch } from '../../../hooks';
import { setTextiles } from '../../../store/slices/textileSlice';
import { CreateTextile } from '../../PersonalOffice/SuperUser/CreateTextile/CreateTextile';
import { UpdateProductImages } from '../../ProductDetail/UpdateProduct/UpdateProductImages';

interface IState {
    textile: ITextileExtends;
}

const TextileDetail: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = localStorage.getItem('isAuth');
    const role = localStorage.getItem('role');

    const [userId, setUserId] = useState(0);
    const [textile, setTextile] = useState<ITextileExtends>({
        anotherDetails: '',
        antiClaw: '',
        createdAt: '',
        deletedAt: '',
        durability: '',
        easyToCare: '',
        id: 0,
        images: [],
        manufacturer: '',
        numberOfShades: '',
        productId: 0,
        textileName: '',
        types: '',
        waterRepellent: '',
    });
    const [image, setImage] = useState<string>('');

    const {
        id,
        images,
        textileName,
        types,
        manufacturer,
        numberOfShades,
        durability,
        antiClaw,
        easyToCare,
        waterRepellent,
        anotherDetails,
    } = textile;

    useEffect(() => {
        const { textile } = location.state as IState;

        if (textile) {
            setTextile(textile);
        }
    }, [location.state]);

    useEffect(() => {
        if (!images.length) {
            setImage('https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg');
            return;
        }
        setImage(images[0].image);
    }, [images.length]);

    useEffect(() => {
        if (user) {
            const { id } = JSON.parse(user);
            setUserId(id);
        }
    }, [user]);

    const updateTextile = (e: any) => {
        e.preventDefault();
        window.scroll(0, 0);

        const textileDetailElement = document.getElementsByClassName('update-textile')[0] as HTMLElement;
        textileDetailElement.classList.toggle('update-textile-show');
    };

    const updateTextileImage = (e: any) => {
        e.preventDefault();

        const updateImageBloc = document.getElementsByClassName('update-image')[0] as HTMLElement;
        updateImageBloc.classList.toggle('update-image-show');
    };

    const deleteTextile = async (e: any) => {
        e.preventDefault();

        const { data } = await textileService.delete(id, userId);
        dispatch(setTextiles({ textiles: data }));

        closeDetailMenu();
    };

    const closeDetailMenu = () => {
        const textileDetailElement = document.getElementsByClassName('textile-detail')[0] as HTMLElement;
        textileDetailElement.classList.toggle('textile-detail-show');
        navigate('/textiles');
    };

    return (
        <div id={'textile-detail'}>
            <div className={'textile-images'}>

                <div className={'textile-images-left'}>{images.map((item) => <button onClick={() => setImage(item.image)} key={item.id}>
                    <img src={item.image} alt="image"/>
                </button>)}
                </div>

                <img className={'textile-image-right'} src={image} alt="image"/>

                {role === 'superUser'
                && <BsPencilFill onClick={updateTextileImage} className={'update-textileImage-btn'}/>
                }

            </div>

            <div className={'textile-description'}>

                <h4>{textileName}</h4>
                <hr/>
                <h6>виробник: {manufacturer};</h6>
                <h6>{types};</h6>
                {numberOfShades && <h6>{numberOfShades} - неймовірних відтінків;</h6>}
                {durability && <h6>{durability};</h6>}
                {antiClaw && <h6>антикіготь;</h6>}
                {easyToCare && <h6>легка у догляді та прибиранні;</h6>}
                {waterRepellent && <h6>водостійка;</h6>}
                {anotherDetails && <h6>{anotherDetails};</h6>}

                {role === 'superUser'
                && <button onClick={deleteTextile}>Видалити</button>
                }

            </div>

            <BsX onClick={closeDetailMenu} className={'close-btn'}/>

            {role === 'superUser'
            && <BsPencilFill onClick={updateTextile} className={'update-textile-btn'}/>
            }

            <div className={'update-textile'}>
                <CreateTextile textileForUpdate={textile} userId={userId}/>
            </div>

            <UpdateProductImages productForUpdate={textile} userId={userId} whatUpdate={'textile'}/>

        </div>
    );
};

export { TextileDetail };
