import React, { FC } from 'react';
import { TiHeartOutline } from 'react-icons/ti';
import { TbMessageCircle } from 'react-icons/tb';
import { FaDolly, FaShoppingBasket, FaRegTrashAlt } from 'react-icons/fa';


import './OneUser.css';
import { IUserExtends } from '../../../../../interfaces';
import { useAppDispatch } from '../../../../../hooks';
import { deleteUserByIdThank } from '../../../../../store';

const OneUser:FC<{user: IUserExtends}> = ({ user }) => {

    const {
        id,
        username,
        surname,
        email,
        phone,
        city,
        image,
        age,
        role,
    } = user;

    const dispatch = useAppDispatch();

    const deleteUser = () => {
        const warning = confirm('Ви впевні що бажаєте видалити цього користувача?');

        if (!warning || role === 'superUser') {
            return;
        }
        dispatch(deleteUserByIdThank(id));
    };

    const toggleDetail = (detailAbout: string) => {
        if (detailAbout === 'likeDetail') {
            toggle('user-like-detail');

        } else if (detailAbout === 'basketDetail') {
            toggle('user-basket-detail');

        } else if (detailAbout === 'orderedDetail') {
            toggle('user-ordered-detail');

        } else if (detailAbout === 'commentDetail') {
            toggle('user-comments-detail ');
        }
    }

    const toggle = (detailClassName: string) => {
        const detailElement = document.getElementsByClassName(detailClassName)[0] as HTMLDivElement;
        detailElement.classList.toggle('user-events-detailShow');
    }

    return (
        <>
            <div className={'one-user'}>

                {image
                    ? <img src={image} alt="user image"/>
                    : <img src="https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                        alt=""/>
                }

                <div className={'one-user-info'}>

                    <h4>{username} {surname}</h4>
                    <h6><i>email:</i> {email};</h6>
                    {phone && <h6><i>Номер:</i> {phone};</h6>}
                    {city && <h6><i>Місто:</i> {city};</h6>}
                    {age && <h6><i>Вік:</i> {age} років;</h6>}

                    <div className={'one-user-events '}>

                        <div  className={'tooltip-event'}>
                            <TiHeartOutline onClick={()=>toggleDetail('likeDetail')}/>
                            <span className={'tooltiptext'}>Вподобання</span>
                        </div>
                        <div  className={'tooltip-event'}>
                            <FaShoppingBasket onClick={()=>toggleDetail('basketDetail')}/>
                            <span className={'tooltiptext'}>Корзина</span>
                        </div>
                        <div  className={'tooltip-event'}>
                            <FaDolly onClick={()=>toggleDetail('orderedDetail')}/>
                            <span className={'tooltiptext'}>Замовлені</span>
                        </div>
                        <div  className={'tooltip-event'}>
                            <TbMessageCircle onClick={()=>toggleDetail('commentDetail')}/>
                            <span className={'tooltiptext'}>Коментарі</span>
                        </div>

                    </div>

                </div>

                {role === 'superUser'
                    ? <p className={'admin'}>адмін</p>
                    : <FaRegTrashAlt onClick={deleteUser} className={'delete-icon'}/>}
            </div>

        </>
    );
};

export { OneUser };
