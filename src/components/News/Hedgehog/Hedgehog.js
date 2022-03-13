import React from 'react';
import s from './Hedgehog.module.css';
import hedgehog from '../../../image/hedgehog.png';
import HedgehogFunc from '../helpers/HedgehodFunc/HedgehogFunc';



const Hedgehog = (props) => {


    const hedgOff = () => {
        props.addActivHedgehog(false)
    }

    const preMessage =()=> {
        
        props.addActivHedgehog(true)
        HedgehogFunc()
    }
  
    return (
        <div className={s.popup}  >
            <span  
            tabIndex='2' 
            onBlur={hedgOff} 
           
            className={!props.activHedgehog
                    ? s.popuptext
                    : s.show}
            id="myPopup" >
                {props.text}
            </span>
            <img src={hedgehog} alt='Ёжик'  onClick={preMessage}/>
        </div>
    )
}

export default Hedgehog


