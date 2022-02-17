import React, { useState } from "react";
import ArrowFunc from "../../../helpers/ArrowFunc/ArrowFunc";
import { DataTransformation } from "../../../helpers/DataTransformation/DataTransformation";
import FormSelectDiagramm from "../../../helpers/FormSelectDiagramm/FormSelectDiagramm";
import HedgehogFunc from "../../../helpers/HedgehodFunc/HedgehogFunc";
import Message from "../../../helpers/Message/Message";
import s from './DiagrammContainer.module.css';
import DiagrammTopStatistic from "./DiagrammTopStatistic/DiagrammTopStatistic";


const DiagrammContainer = (props) => {

    let [edit, setEdit] = useState(false)

    const activateEditMode = () => {
        if (props.diagramm.periodPo && props.diagramm.periodS) {
            setEdit(true)
        }
        else if (!props.diagramm.periodS) {
            HedgehogFunc(props.addText, 'Выберите начало периода ...')
            ArrowFunc('arrowPeriod', 'periodS', 'buttonTable')

        }
        else if (!props.diagramm.periodPo) {
            HedgehogFunc(props.addText, 'Выберите окончание периода ...')
            ArrowFunc('arrowPeriod', 'periodPo', 'buttonTable')

        }

    }
    const deActivateEditMode = () => {
        setEdit(false)
    }

    const diagramm = props.diagramm.category.map(a =>{
        return {
            ...a,
            data: a.data.filter(a =>
                a.time <= (props.diagramm.periodPo + ' ' + props.diagramm.periodPoTime) &&
                a.time >= (props.diagramm.periodS + ' ' + props.diagramm.periodSTime))
        }}
    )

    const total = diagramm.map(a => a.data.map(e=>e.num).reduce((sum, current) => sum + current, 0))
    .reduce((acc, num) => acc + num, 0)    // суммарный расход за выбранный период
    

    const addSelect = (value) => {
        props.addSelectDiagrammStat(value)
    }


    let  textMessage = 
    `Нет расходов с ${ DataTransformation(props.diagramm.periodS)} 
    по ${DataTransformation(props.diagramm.periodPo)} ...`

    return (
        <div>
            <div >Диаграмма расходов по всем категориям
                <div className={s.select}>
                    <span className={s.selectText}>за выбранный период в </span>
                    <span className={s.selectValue}>
                        <FormSelectDiagramm
                            addSelect={addSelect}
                            select={props.diagramm.selectDiagrammStat} /></span>
                </div>
            </div>

            {!edit
                ? <div >
                    <button
                        className='buttonTable'
                        onClick={activateEditMode}> Показать </button>
                </div>
                : <div>
                    <button
                        className='buttonTable'
                        onClick={deActivateEditMode}> Убрать </button>
                    {total === 0
                        ?  <Message textMessage={textMessage} idMessage='messageDiagrammTotal'/>
                        : <div className={s.pie}>
                            <DiagrammTopStatistic 
                            total={total}
                            diagramm={diagramm}
                            selectDiagramm={props.diagramm.selectDiagrammStat}
                            dollar = {props.diagramm.exchangeRates.dollar.Cur_OfficialRate}
                            euro = {props.diagramm.exchangeRates.euro.Cur_OfficialRate}  
                            />
                        </div>
                    }
                </div>
            }
        </div>)
}

export default DiagrammContainer