import React, { useState } from "react";
import s from './StatisticTable.module.css';
import StatisticTableSumm from "../StatisticTableSumm/StatisticTableSumm";


const StatisticTable = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [editVal, setEditVal] = useState(false)
    
    const activateEditMode = () => {
        if (props.diagramm.activ && props.diagramm.periodPo && props.diagramm.periodS) {
            setEditMode(true)
        }
        else  setEditVal(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }

    const category = props.diagramm.category

     let filterTable = category
     .filter(a =>props.diagramm.activ 
        ? a.nameRus === props.diagramm.activ 
        : a.nameRus===category[0].nameRus)[0].data
     .filter(a =>
         a.time <= (props.diagramm.periodPo + ' ' + props.diagramm.periodPoTime)
         && a.time >= (props.diagramm.periodS + ' ' + props.diagramm.periodSTime))
  
    return (
        <div className={s.statisticDate}>
                <div className={s.statisticDateTable}>
                    <div>Таблица расходов по выбранной категории за выбранный период. </div>
                    {!editMode
                        ? <div>
                            <button onClick={activateEditMode}> Показать </button>
                        </div>
                        : <div >
                            <button onClick={deActivateEditMode}> Убрать </button>

                            {filterTable.length === 0

                                ? <div className={s.categoryVal}>Нет расходов на 

                               <span> {props.diagramm.activ.slice(-1) === 'а' 
                                  ? props.diagramm.activ.slice(0, -1) + 'у'
                                  : props.diagramm.activ} </span>

                                  <div>за выбранный период</div></div>

                                : <div>
                                <div className={s.statisticTable}>
                                    <div className={s.statisticName}>
                                    <span className={s.statisticNameDate}>Дата:</span>
                                    <span className={s.statisticNameSumm}>Сумма:</span>
                                    </div>

                                    {filterTable.map(a => <div key={a.id} className={s.table}>
                                        <span className={s.statisticDateTime}>  {a.time}  </span>
                                        <span className={s.statisticDateNum}> {a.num} </span>
                                    </div>)}

                                </div>
                                <div className={s.statisticDateSumm}>
                                        Потрачено на <span className={s.categorySumm}> 
                                        {props.diagramm.activ.slice(-1) === 'а'
                                            ? props.diagramm.activ.slice(0, -1) + 'у'
                                            : props.diagramm.activ} </span> 
                                            <div> за выбранный период: </div>
                                        <StatisticTableSumm
                                            filterTable={filterTable}
                                            category={props.diagramm.category}
                                            activ={props.diagramm.activ}
                                            dollar={props.diagramm.dollar.Cur_OfficialRate} />
                                    </div>
                                    </div>}
                            
                        </div>}
                    {editVal && !props.diagramm.activ
                        ? <div className={s.categoryVal}>Выбери категорию</div>
                        : null
                    }
                    {editVal && (!props.diagramm.periodPo || !props.diagramm.periodS)
                        ? <div className={s.categoryVal}>Выбери период</div>
                        : null
                    }
                </div>
        </div>
    )
}

export default StatisticTable