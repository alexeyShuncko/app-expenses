import React, { useState } from "react";
import s from './TotalTable.module.css';
import TotalTableExpenses from "./TotalExpenses/TotalExpenses";
import TotalIncome from "./TotalIncome/TotalIncome";


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
                    <button onClick={activateEditMode}> Показать </button>
                </div>
                : <div >
                    <button onClick={deActivateEditMode}> Убрать </button>
                    {props.diagramm.tableSelect === 'расходов'
                        ? <TotalTableExpenses
                            todayPo={props.diagramm.today.po}
                            todayS={props.diagramm.today.s}
                            diagramm={props.diagramm} />
                        : <TotalIncome
                            todayPo={props.diagramm.today.po}
                            todayS={props.diagramm.today.s}
                            income={props.diagramm.income}
                            periodS={props.diagramm.periodS}
                            periodPo={props.diagramm.periodPo}
                            exchangeRates={props.diagramm.exchangeRates} />
                    }
                </div>}
        </div>

    )
}

export default TotalTable