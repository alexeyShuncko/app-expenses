import React, { useState } from "react";
import s from './StatisticTable.module.css';
import StatisticTableSumm from "../StatisticTableSumm/StatisticTableSumm";
import { HocValuta } from "../../../HOC/HocValuta";
import HedgehogFunc from "../../../helpers/HedgehodFunc/HedgehogFunc";
//import ArrowFunc from "../../../helpers/ArrowFunc/ArrowFunc";


const StatisticTable = (props) => {

    let [editMode, setEditMode] = useState(false)

    
    const styles = {
        borderBottom: `solid 3px ${props.diagramm.category.filter(a => props.diagramm.activ 
            ? a.nameRus===props.diagramm.activ
            : a.nameRus===props.diagramm.category[0].nameRus)[0].color}`
    }


    const category = props.diagramm.category

    let filterTable = category
        .filter(a => props.diagramm.activ
            ? a.nameRus === props.diagramm.activ
            : a.nameRus === category[0].nameRus)[0].data
        .filter(a =>

            a.time <= (props.diagramm.periodPo + ' ' + props.diagramm.periodPoTime)
            && a.time >= (props.diagramm.periodS + ' ' + props.diagramm.periodSTime))

    const activateEditMode = () => {
        if (props.diagramm.activ
            && props.diagramm.periodPo
            && props.diagramm.periodS
            && filterTable.length !== 0) {
            console.log('попал')
            setEditMode(true)
        }
        else if (!props.diagramm.activ) {
            HedgehogFunc(props.addText, 'Выберите категорию ...')
            //ArrowFunc('colorAdd', 'addColor', 'buttonAdd')
        }
        else if (!props.diagramm.periodPo || !props.diagramm.periodS) {
            HedgehogFunc(props.addText, 'Выберите период ...')
            //ArrowFunc('colorAdd', 'addColor', 'buttonAdd')
        }
        else if (filterTable.length === 0) {
            HedgehogFunc(props.addText, 'Нет расходов за выбранный период ...')
            //ArrowFunc('colorAdd', 'addColor', 'buttonAdd')
        }
    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }


    return (
            <div className={s.statisticDateTable}>
                <div>Таблица расходов по выбранной категории за выбранный период. </div>
                {!editMode
                    ? <div>
                        <button onClick={activateEditMode}> Показать </button>
                        <div className={s.hocHidden}>{HocValuta(StatisticTableSumm, props, null, null, filterTable)}</div>
                    </div>
                    : <div >
                        <button onClick={deActivateEditMode}> Убрать </button>

                        <div>
                            <div className={s.statisticTable}>
                                <div className={s.statisticName}>
                                    <span className={s.statisticNameDate}>Дата:</span>
                                    <span className={s.statisticNameSumm}>Сумма:</span>
                                </div>

                                {filterTable.map(a => <div key={a.id} className={s.table}>
                                    <span className={s.statisticDateTime}>
                                        {a.time.slice(8, 10) + '.' + a.time.slice(5, 7) + '.'
                                            + a.time.slice(0, 4) + ' ' + a.time.slice(-5)}
                                    </span>
                                    <span className={s.statisticDateNum}> {a.num} </span>
                                </div>)}

                            </div>
                            <div className={s.statisticDateSumm} style={styles}>
                                Потрачено на <span className={s.categorySumm}>
                                    {props.diagramm.activ.slice(-1) === 'а'
                                        ? props.diagramm.activ.slice(0, -1) + 'у'
                                        : props.diagramm.activ} </span>
                                <div> за выбранный период: </div>
                                <div className={s.totalCAtegory}>
                                    {HocValuta(StatisticTableSumm, props, null, null, filterTable)}
                                </div>

                            </div>
                        </div>
                    </div>}

            </div>
    )
}

export default StatisticTable