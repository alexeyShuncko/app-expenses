import React, { useEffect } from 'react';
import s from './DollarRate.module.css';


const DollarRate = (props) => {


    useEffect(()=>{
        if (props.dollar.Cur_OfficialRate === '') 
    {props.getDollarUpdate()}
    else return null})



return (
    <div >
<div className={s.dollar}>Курс доллара по НБРБ 
<div>на {props.dollar.Date}:</div>
</div>
<div>1 USD = {props.dollar.Cur_OfficialRate} BYN</div>
    </div>
)

}
export default DollarRate

