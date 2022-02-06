import React, { useEffect } from 'react';
import s from './DollarRate.module.css';


const DollarRate = (props) => {


    useEffect(() => {
        if (props.dollar.Date === '') { props.getDollarUpdate() }
        else return null
    })



    return (
        <div >
            <div className={s.dollar}>Курс доллара по НБРБ
                <div>
                    на {props.dollar.Date.slice(8, 10) + '.'
                        + props.dollar.Date.slice(5, 7) + '.'
                        + props.dollar.Date.slice(0, 4) + 'г.'} :
                </div>
            </div>
            <div>1 USD = {props.dollar.Cur_OfficialRate} BYN</div>
        </div>
    )

}
export default DollarRate

