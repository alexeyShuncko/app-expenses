import React from 'react';
import s from './DiagrammForm.module.css';
import FormSelectDiagramm from '../../helpers/FormSelectDiagramm/FormSelectDiagramm';
import DateAnt from '../../helpers/Date/DateAnt';

const DiagrammForm = (props) => {
  const addSelect = (value) => {
    props.addSelectDiagrammStat(value);

    props.addText(`Данные диаграммы в ${value} ...`);
    props.addActivHedgehog(true);
  };

  const selectChangeDiagramm = (e) => {
    props.addDiagrammSelect(e.target.value);
    e.target.value === 'расходов'
      ? props.addText(`На диаграмме ваши расходы ...`) &&
        props.addActivHedgehog(true)
      : props.addText(`На диаграмме ваши доходы ...`) &&
        props.addActivHedgehog(true);
  };

  const onChangeDate = (data, dateString) => {
    props.addPeriod('diagramm', dateString);
  };

  return (
    <div className={s.select}>
      <div>
        <span className={s.selectText}>
          {' '}
          Диаграмма
          <select
            className={s.selectDiag}
            onChange={selectChangeDiagramm}
            defaultValue={props.diagrammSelect}>
            <option>расходов</option>
            <option>доходов</option>
          </select>
          в{' '}
        </span>
        <FormSelectDiagramm
          addSelect={addSelect}
          select={props.selectDiagrammStat}
        />
      </div>
      <div className={s.selectText}>за период:</div>
      <DateAnt
        period={props.periodDiagramm}
        s={props.todayS}
        po={props.todayPo}
        onChangeDate={onChangeDate}
      />
    </div>
  );
};

export default DiagrammForm;
