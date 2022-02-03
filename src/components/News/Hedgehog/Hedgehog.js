import React from 'react';
import s from './Hedgehog.module.css';
import hedgehog from '../../../image/hedgehog.png';



const Hedgehog = (props) => {

    return ( 
            <div className={s.popup}>
                <span className={s.popuptext} id="myPopup">{props.diagramm.text}</span>
                <img src={hedgehog} alt='Ёжик' />
            </div>
    )
}

export default Hedgehog


