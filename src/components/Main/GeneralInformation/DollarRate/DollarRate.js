import React, { useState } from 'react';
import s from './DollarRate.module.css';
import { DataTransformation } from '../../../helpers/DataTransformation/DataTransformation';

const DollarRate = ({ getValute, ...props }) => {
  let [rates, setRates] = useState(false);

  if (!rates && props.exchangeRates.ruble.Date.length === 0) {
    setRates(true);
    getValute().then(() => {
      setRates(false);
    });
  }

  return (
    <div className={s.dollarRate}>
      {rates ? (
        <div className={s.dollar}>Загрузка...</div>
      ) : (
        <>
          <div className={s.dollar}>
            Курсы валют по НБРБ
            <div>
              на {DataTransformation(props.exchangeRates.dollar.Date)} :
            </div>
          </div>
          <div className={s.rates}>
            1 USD = {props.exchangeRates.dollar.Cur_OfficialRate} BYN
          </div>
          <div className={s.rates}>
            1 EUR = {props.exchangeRates.euro.Cur_OfficialRate} BYN
          </div>
          <div className={s.rates}>
            100 RUB = {props.exchangeRates.ruble.Cur_OfficialRate} BYN
          </div>
        </>
      )}
    </div>
  );
};
export default DollarRate;
