import React from 'react';
import s from './ArrowValidate.module.css';
import arrow from '../../../image/arrow1.png'



const ArrowValidate = (props) => {

    return (
        <div className={s.arrow}>
            <img  id={props.arrowId} className={s.arrowImg} src={arrow} alt='Стрелка' />
        </div>
    )

}

export default ArrowValidate