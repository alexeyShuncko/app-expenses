import React, { useState } from 'react';
import s from './HocValuta.module.css';

const HocValuta = (props) => {
  let [editBYN, setEditBYN] = useState('BYN');

  let statisticTable = props.filterTable
    ? props.filterTable
        .map((a) => a.amount)
        .reduce((sum, current) => sum + current, 0)
    : 0;
  let statisticTotal = props.totalSumm ? props.totalSumm : 0;

  let summ =
    props.category &&
    props.category
      .map((a) =>
        a.data.map((b) => b.amount).reduce((acc, num) => acc + num, 0)
      )
      .reduce((acc, num) => acc + num, 0);

  const data = () => {
    if (editBYN === 'BYN') {
      if (props.value === 'salary') {
        return props.salary.toFixed(2);
      } else if (props.value === 'salarySpent') {
        return summ.toFixed(2);
      } else if (props.value === 'salaryRemainder') {
        return (props.salary - summ).toFixed(2);
      } else if (props.value === 'statisticTable') {
        return statisticTable.toFixed(2);
      } else if (props.value === 'statisticTotal') {
        return statisticTotal.toFixed(2);
      }
    } else if (editBYN === 'USD') {
      if (props.value === 'salary') {
        return (
          props.salary / props.exchangeRates.dollar.Cur_OfficialRate
        ).toFixed(2);
      } else if (props.value === 'salarySpent') {
        return (summ / props.exchangeRates.dollar.Cur_OfficialRate).toFixed(2);
      } else if (props.value === 'salaryRemainder') {
        return (
          (props.salary - summ) /
          props.exchangeRates.dollar.Cur_OfficialRate
        ).toFixed(2);
      } else if (props.value === 'statisticTable') {
        return (
          statisticTable / props.exchangeRates.dollar.Cur_OfficialRate
        ).toFixed();
      } else if (props.value === 'statisticTotal') {
        return (
          statisticTotal / props.exchangeRates.dollar.Cur_OfficialRate
        ).toFixed();
      }
    } else if (editBYN === 'EUR') {
      if (props.value === 'salary') {
        return (
          props.salary / props.exchangeRates.euro.Cur_OfficialRate
        ).toFixed(2);
      } else if (props.value === 'salarySpent') {
        return (summ / props.exchangeRates.euro.Cur_OfficialRate).toFixed(2);
      } else if (props.value === 'salaryRemainder') {
        return (
          (props.salary - summ) /
          props.exchangeRates.euro.Cur_OfficialRate
        ).toFixed(2);
      } else if (props.value === 'statisticTable') {
        return (
          statisticTable / props.exchangeRates.euro.Cur_OfficialRate
        ).toFixed();
      } else if (props.value === 'statisticTotal') {
        return (
          statisticTotal / props.exchangeRates.euro.Cur_OfficialRate
        ).toFixed();
      }
    } else if (editBYN === 'RUB') {
      if (props.value === 'salary') {
        return (
          (props.salary / props.exchangeRates.ruble.Cur_OfficialRate) *
          100
        ).toFixed(2);
      } else if (props.value === 'salarySpent') {
        return (
          (summ / props.exchangeRates.ruble.Cur_OfficialRate) *
          100
        ).toFixed(2);
      } else if (props.value === 'salaryRemainder') {
        return (
          ((props.salary - summ) / props.exchangeRates.ruble.Cur_OfficialRate) *
          100
        ).toFixed(2);
      } else if (props.value === 'statisticTable') {
        return (
          (statisticTable / props.exchangeRates.ruble.Cur_OfficialRate) *
          100
        ).toFixed();
      } else if (props.value === 'statisticTotal') {
        return (
          (statisticTotal / props.exchangeRates.ruble.Cur_OfficialRate) *
          100
        ).toFixed();
      }
    }
  };
  let dataTotal = data();

  const activEditBYN = (e) => {
    if (e.target.value !== editBYN) setEditBYN(e.target.value);
    if (props.value === 'statisticTable') {
      props.tableValuta(e.target.value);
    }
    if (props.value === 'statisticTotal') {
      props.tableTotalValuta(e.target.value);
    }
  };

  return (
    <div className={s.salary}>
      <div className={s.salaryValue}>{dataTotal}</div>
      <div className={s.salaryValuta}>
        <select
          className={s.fieldBynUsd}
          defaultValue={editBYN}
          onChange={activEditBYN}>
          <option value="BYN">BYN</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
        </select>
      </div>
    </div>
  );
};
export default HocValuta;
