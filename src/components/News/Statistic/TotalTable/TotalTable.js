import React, { useState } from "react";
import s from './TotalTable.module.css';
import TotalTableExpenses from "./TotalExpenses/TotalExpenses";
import TotalIncome from "./TotalIncome/TotalIncome";
import { Button } from 'antd';


const TotalTable = (props) => {

    let [editMode, setEditMode] = useState(false)

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
                    <Button type='primary' onClick={activateEditMode}>Показать</Button>
                </div>
                : <div >
                     <Button style={{marginBottom: 17, marginTop: 17}}
                     type='primary' danger onClick={deActivateEditMode}>Убрать</Button>
                    {props.diagramm.tableSelect === 'расходов'
                        ? <TotalTableExpenses
                            todayPo={props.diagramm.today.po}
                            todayS={props.diagramm.today.s}
                            periodS={props.diagramm.period[0].S}
                            periodPo={props.diagramm.period[0].Po}
                            diagramm={props.diagramm} />
                        : <TotalIncome
                            todayPo={props.diagramm.today.po}
                            todayS={props.diagramm.today.s}
                            income={props.diagramm.income}
                            periodS={props.diagramm.period[0].S}
                            periodPo={props.diagramm.period[0].Po}
                            exchangeRates={props.diagramm.exchangeRates} />
                    }
                </div>}
        </div>

    )
}

export default TotalTable