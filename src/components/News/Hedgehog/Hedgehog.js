import React from 'react';
import s from './Hedgehog.module.css';
import hedgehog from '../../../image/hedgehog.png';



const Hedgehog = (props) => {


    const hedg = () => {
        console.log("убрать")
        props.addActivHedgehog(false)
        document.getElementById("myPopup").blur()
    }
    const foc = () => {
        console.log('фокус')
    }

    return (
        <div className={s.popup}  >
            <span  tabIndex='0' onBlur={hedg} onFocus={foc}
                className={!props.diagramm.activHedgehog
                    ? s.popuptext
                    : s.show}
                id="myPopup" >
                {props.diagramm.text}
            </span>
            <img src={hedgehog} alt='Ёжик' />
        </div>
    )
}

export default Hedgehog


