import React, { useEffect } from 'react';
import s from './DollarRate.module.css';
import { DataTransformation } from '../../../helpers/DataTransformation/DataTransformation';


const DollarRate = (props) => {


    useEffect(() => {
        if (props.exchangeRates.dollar.Date === '') { 
            props.getDollarUpdate() 
            props.getEuroUpdate()
        }
        else return null
    })


    return (
        <div >
            <div className={s.dollar}>Курсы валют по НБРБ
                <div> 
                    на {DataTransformation(props.exchangeRates.dollar.Date)} :
                </div>
            </div>
            <div>1 USD = {props.exchangeRates.dollar.Cur_OfficialRate} BYN</div>
            <div>1 EUR = {props.exchangeRates.euro.Cur_OfficialRate} BYN</div>
        </div>
    )

}
export default DollarRate

