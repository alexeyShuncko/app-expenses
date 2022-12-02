import React from 'react';
import DateAnt from '../../helpers/Date/DateAnt';
import s from './GrafsForm.module.css';

const GrafsForm = (props) => {
  const activGrafSelect = (e) => {
    let str = props.grafSelect;
    props.addGrafSelectValuta(e.target.value);

    props.addText(
      `${str.slice(0, 1).toUpperCase()}${str.slice(
        1,
        str.length - 2
      )}ы на графике в ${e.target.value} ...`
    );
    props.addActivHedgehog(true);
  };

  const selectChange = (e) => {
    props.addGrafSelect(e.target.value);
    e.target.value === 'расходов'
      ? props.addText(`На графике ваши расходы ...`) &&
        props.addActivHedgehog(true)
      : props.addText(`На графике ваши доходы ...`) &&
        props.addActivHedgehog(true);
  };

  const onChangeDate = (data, dateString) => {
    props.addPeriod('graf', dateString);
  };

  return (
    <div className={s.grafsForm}>
      <div>
        <span className={s.grafTitle}>
          График
          <select
            className={s.selectDiag}
            onChange={selectChange}
            defaultValue={props.grafSelect}>
            <option>расходов</option>
            <option>доходов</option>
          </select>{' '}
          в
        </span>
        <select
          className={s.fieldBynUsd}
          defaultValue={props.grafSelectValuta}
          onChange={activGrafSelect}>
          <option value="BYN">BYN</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
        </select>
      </div>
      <div>за период:</div>
      <DateAnt
        period={props.periodGraf}
        s={props.todayS}
        po={props.todayPo}
        onChangeDate={onChangeDate}
      />
    </div>
  );
};

export default GrafsForm;
