import React, { useEffect, useState } from 'react';
import s from './DollarRate.module.css';
import { DataTransformation } from '../../../helpers/DataTransformation/DataTransformation';


const DollarRate = ({getDollarUpdate,getEuroUpdate, ...props}) => {

    let [rates, setRates] = useState(false)


    useEffect(() => {
        if (!rates && props.exchangeRates.dollar.Date === '') {
            setRates(true)
            getDollarUpdate()
            getEuroUpdate()
        }
    }, [setRates,getDollarUpdate,getEuroUpdate,props.exchangeRates.dollar.Date,rates ])


    return (
        <div className={s.dollarRate}>
            <div className={s.dollar}>Курсы валют по НБРБ
                <div>
                    на {DataTransformation(props.exchangeRates.dollar.Date)} :
                </div>
            </div>
            <div className={s.rates}>1 USD = {props.exchangeRates.dollar.Cur_OfficialRate} BYN</div>
            <div className={s.rates}>1 EUR = {props.exchangeRates.euro.Cur_OfficialRate} BYN</div>
        </div>
    )

}
export default DollarRate

