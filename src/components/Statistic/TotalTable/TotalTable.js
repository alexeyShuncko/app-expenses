import React, { useState } from 'react';
import s from './TotalTable.module.css';
import TotalTableExpenses from './TotalExpenses/TotalExpenses';
import MyModal from '../../helpers/Modal';
import ExportExcel from './ExportExcel/ExportExcel';

const TotalTable = (props) => {
  const [visible, setVisible] = useState(false);
  const [idDelet, setIdDelet] = useState('');

  const selectChange = (e) => {
    props.addTableSelect(e.target.value);
    e.target.value === 'расходов'
      ? props.addText(`В таблице ваши расходы ...`) &&
        props.addActivHedgehog(true)
      : props.addText(`В таблице ваши доходы ...`) &&
        props.addActivHedgehog(true);
  };

  return (
    <div className={s.statisticDateTable}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        Таблица
        <select
          className={s.select}
          onChange={selectChange}
          defaultValue={props.diagramm.tableSelect}>
          <option>расходов</option>
          <option>доходов</option>
        </select>
        за выбранный период.
        <ExportExcel
          diagramm={props.diagramm}
          periodS={props.diagramm.period[0].S}
          periodPo={props.diagramm.period[0].Po}
        />
      </div>

      <TotalTableExpenses
        setIdDelet={setIdDelet}
        setVisible={setVisible}
        todayPo={props.diagramm.today.po}
        todayS={props.diagramm.today.s}
        periodS={props.diagramm.period[0].S}
        periodPo={props.diagramm.period[0].Po}
        diagramm={props.diagramm}
      />

      <MyModal
        addText={props.addText}
        addActivHedgehog={props.addActivHedgehog}
        select={props.diagramm.tableSelect}
        deleteAppRecording={props.deleteAppRecording}
        idDelet={idDelet}
        setVisible={setVisible}
        visible={visible}
        title={'Удаление записи.'}
        modalText={'Вы действительно хотите удалить запись?'}
      />
    </div>
  );
};

export default TotalTable;
