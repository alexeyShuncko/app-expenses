import React from "react";
import s from './DiagrammForm.module.css';
import FormSelectDiagramm from "../../helpers/FormSelectDiagramm/FormSelectDiagramm";
import HedgehogFunc from "../../helpers/HedgehodFunc/HedgehogFunc";




const DiagrammForm = (props) => {


    const addSelect = (value) => {
        props.addSelectDiagrammStat(value)
        HedgehogFunc(props.addText, `Данные диаграммы в ${value} ...`)
    }

    const diagrammPeriodS = (e) => {
        props.addDiagrammS(e.target.value)
    }
    const diagrammPeriodPo = (e) => {
        props.addDiagrammPo(e.target.value)
    }
    const selectChangeDiagramm = (e) => {
        props.addDiagrammSelect(e.target.value)
    }



    return (
        <div className={s.select}>
            <div>
                <span className={s.selectText}>  Диаграмма
                    <select 
                    className={s.selectDiag} 
                    onChange={selectChangeDiagramm} 
                    defaultValue={props.diagrammSelect}>
                        <option>расходов</option>
                        <option>доходов</option>
                    </select>
                    в </span>
                <FormSelectDiagramm
                    addSelect={addSelect}
                    select={props.selectDiagrammStat} />
            </div>

            <div className={s.selectText}>
                с: <input
                    type='date'
                    onChange={diagrammPeriodS}
                    min='2021-01-01'
                    max={props.todayPo}
                    defaultValue={props.todayS} />
                по: <input
                    type='date'
                    onChange={diagrammPeriodPo}
                    min={props.periodS || props.todayS}
                    max={props.todayPo}
                    defaultValue={props.todayPo} />
            </div>

        </div>
    )
}

export default DiagrammForm