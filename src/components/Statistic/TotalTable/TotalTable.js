import React, { useState } from "react";
import s from './TotalTable.module.css';
import TotalTableExpenses from "./TotalExpenses/TotalExpenses";
import TotalIncome from "./TotalIncome/TotalIncome";
import { Button } from 'antd';
import MyModal from "../../helpers/Modal";


const TotalTable = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [visible, setVisible] = useState(false);
    const [idDelet, setIdDelet] = useState('');

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
    }


    const selectChange = (e) => {
        props.addTableSelect(e.target.value)
        e.target.value === 'расходов'
            ? props.addText(`В таблице ваши расходы ...`) && props.addActivHedgehog(true)
            : props.addText(`В таблице ваши доходы ...`) && props.addActivHedgehog(true)
    }

    return (
        <div className={s.statisticDateTable}>
            <div>Таблица
                <select className={s.select} onChange={selectChange} defaultValue={props.diagramm.tableSelect}>
                    <option>расходов</option>
                    <option>доходов</option>
                </select>
                за выбранный период. </div>

            {!editMode
                ? <div>
                    <Button type='primary' onClick={activateEditMode}
                        style={{ marginTop: 5 }}>Показать</Button>
                </div>
                : <div >
                    <Button style={{ marginBottom: 17, marginTop: 17 }}
                        type='primary' danger onClick={deActivateEditMode}>Убрать</Button>

                    {props.diagramm.tableSelect === 'расходов'
                        ? <TotalTableExpenses
                        setIdDelet={setIdDelet}
                        setVisible={setVisible}
                        tableTotalValuta={props.tableTotalValuta}
                            todayPo={props.diagramm.today.po}
                            todayS={props.diagramm.today.s}
                            periodS={props.diagramm.period[0].S}
                            periodPo={props.diagramm.period[0].Po}
                            diagramm={props.diagramm}
                           />
                        : <TotalIncome
                        setIdDelet={setIdDelet}
                        setVisible={setVisible}
                        tableTotalValuta={props.tableTotalValuta}
                        diagramm={props.diagramm}
                            todayPo={props.diagramm.today.po}
                            todayS={props.diagramm.today.s}
                            income={props.diagramm.income}
                            periodS={props.diagramm.period[0].S}
                            periodPo={props.diagramm.period[0].Po}
                            exchangeRates={props.diagramm.exchangeRates} />
                    }

                </div>}
            <MyModal
             addText={props.addText}
             addActivHedgehog={props.addActivHedgehog}
            select={props.diagramm.tableSelect}
            deleteAppRecording={props.deleteAppRecording}
            idDelet={idDelet}
            setVisible={setVisible}
            visible={visible}
                title={'Удаление записи.'}
                modalText={'Вы действительно хотите удалить запись?'} />
        </div>
    )
}

export default TotalTable