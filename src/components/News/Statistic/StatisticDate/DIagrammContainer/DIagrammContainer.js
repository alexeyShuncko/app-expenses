import React, { useEffect, useState } from "react";
import FormSelectDiagramm from "../../../helpers/FormSelectDiagramm/FormSelectDiagramm";
import s from './DiagrammContainer.module.css';
import DiagrammTotal from "./DiagrammTotal/DiagrammTotal";
import StatisticDateDiagram from './StatisticDateDiagram';


const DiagrammContainer = (props) => {

    let [edit, setEdit] = useState(false)
    let [editVal, setEditVal] = useState(false)

    const activateEditMode = () => {
        if (props.diagramm.periodPo && props.diagramm.periodS) {
            setEdit(true)
        }
        else setEditVal(true)
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
    const Cur_OfficialRate = props.diagramm.dollar.Cur_OfficialRate

    const addSelect = (e) => {
        props.addSelectDiagrammStat(e.target.value)
    }

    useEffect(() => {
        if (edit === true && total !== 0) {
            StatisticDateDiagram(diagramm, eee, select, Cur_OfficialRate)
        }
    }, [props.diagramm, edit, diagramm, eee, select, Cur_OfficialRate, total]);


    return (
        <div>
            <div >Диаграмма расходов по всем категориям
                <div className={s.select}>
                    <span className={s.selectText}>за выбранный период в </span>
                    <span className={s.selectValue}>
                        <FormSelectDiagramm
                            addSelect={addSelect}
                            select={select} /></span> </div>
            </div>

            {!edit
                ? <div >
                    <button onClick={activateEditMode}> Показать </button>
                </div>
                : <div>
                    <button onClick={deActivateEditMode}> Убрать </button>
                    {total === 0
                        ? <div className={s.categoryVal}>Нет расходов за выбранный период</div>
                        : <div>
                        <div><canvas id="period" width='250px' height='300px'></canvas></div>
                        <div>
                           Всего потрачено за выбранный период:
                           <DiagrammTotal
                               total={total}
                               dollar={props.diagramm.dollar.Cur_OfficialRate} />
                       </div>
                       </div>
                    }
                </div>
            }

            {editVal && (!props.diagramm.periodPo || !props.diagramm.periodS)
                ? <div className={s.categoryVal}>Выбери период</div>
                : null
            }
        </div>)
}

export default DiagrammContainer