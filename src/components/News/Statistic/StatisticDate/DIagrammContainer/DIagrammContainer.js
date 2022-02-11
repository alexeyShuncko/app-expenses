import React, { useEffect, useState } from "react";
import ArrowFunc from "../../../helpers/ArrowFunc/ArrowFunc";
import { DataTransformation } from "../../../helpers/DataTransformation/DataTransformation";
import FormSelectDiagramm from "../../../helpers/FormSelectDiagramm/FormSelectDiagramm";
import HedgehogFunc from "../../../helpers/HedgehodFunc/HedgehogFunc";
import Message from "../../../helpers/Message/Message";
import Legend from "../../../Main/DiagrammMain/Legend";
import s from './DiagrammContainer.module.css';
import StatisticDateDiagram from './StatisticDateDiagram';


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

    let eee = props.diagramm.category

    const diagramm = eee.map(a => a.data)
        .map(a => a
            .filter(a =>
                a.time <= (props.diagramm.periodPo + ' ' + props.diagramm.periodPoTime) &&
                a.time >= (props.diagramm.periodS + ' ' + props.diagramm.periodSTime))
        )
        .map(a => a
            .map(a => a.num)
            .reduce((sum, current) => sum + current, 0)
        )

    const total = diagramm.reduce((sum, current) => sum + current, 0)
    const select = props.diagramm.selectDiagrammStat
    const dollar = props.diagramm.exchangeRates.dollar.Cur_OfficialRate  
    const euro = props.diagramm.exchangeRates.euro.Cur_OfficialRate  

    const addSelect = (value) => {
        props.addSelectDiagrammStat(value)
    }

    useEffect(() => {
        if (edit === true && total !== 0) {
            StatisticDateDiagram(diagramm, eee, select, dollar,euro)
        }
    }, [props.diagramm, edit, diagramm, eee, select, dollar,euro, total]);


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
                            select={select} /></span>
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
                        : <div>
                            <div className={s.diagramm}><canvas id="period" width='250px' height='300px'></canvas>
                                <Legend {...props} />
                            </div>
                        </div>
                    }
                </div>
            }
        </div>)
}

export default DiagrammContainer