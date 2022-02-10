import React, { useState } from "react";
import s from './StatisticDate.module.css';
import DiagrammContainer from "./DIagrammContainer/DIagrammContainer";
import DiagrammTotal from "./DIagrammContainer/DiagrammTotal/DiagrammTotal";
import { HocValuta } from "../../HOC/HocValuta";
import HedgehogFunc from "../../helpers/HedgehodFunc/HedgehogFunc";
import ArrowFunc from "../../helpers/ArrowFunc/ArrowFunc";
import { DataTransformation } from "../../helpers/DataTransformation/DataTransformation";
import Message from "../../helpers/Message/Message";


const StatisticDate = (props) => {

    let [editMode, setEditMode] = useState(false)
   
    const activateEditMode = () => {
        if (props.diagramm.periodPo 
            && props.diagramm.periodS ) {
            setEditMode(true)
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
        setEditMode(false)
    }

    const category = props.diagramm.category

    let result =
        category.map(a => [a.nameRus, a.data.filter(a =>
            a.time <= (props.diagramm.periodPo + ' ' + props.diagramm.periodPoTime) &&
            a.time >= (props.diagramm.periodS + ' ' + props.diagramm.periodSTime))])  // фильтрую в зависимости от выбранного периода

    let newResult = result.map(a => a[1].map(e => Object.defineProperty(e, 'name', {
        value: a[0],
        writable: true,
        enumerable: true,
        configurable: true
    })))                                              //добавляю свойство 'name' в каждый объект с соответствующим значением

    let total = newResult[0].concat(
        newResult[1] ? newResult[1] : [],
        newResult[2] ? newResult[2] : [],
        newResult[3] ? newResult[3] : [],
        newResult[4] ? newResult[4] : [],
        newResult[5] ? newResult[5] : [])  // соединяю массивы ...........

    
    let totalSort = total.sort((a, b) => a.time > b.time ? 1 : -1)            //сортировка по времени 
    const totalSumm = total.map(a=>a.num).reduce((sum, current) => sum + current, 0)

    let  textMessage = 
    `Нет расходов с ${ DataTransformation(props.diagramm.periodS)} 
    по ${DataTransformation(props.diagramm.periodPo)} ...`

    return (
        <div className={s.container}>
            <div className={s.statisticDate}>
                <div className={s.statisticDateItem}>
                    <div className={s.statisticDateTable}>
                        <div>Таблица расходов по всем  категориям за выбранный период. </div>
                        {!editMode 
                            ? <div>
                                <button 
                                className='buttonTable'
                                onClick={activateEditMode}> Показать </button>
                            </div>
                            : <div >
                                <button  
                                className='buttonTable'
                                onClick={deActivateEditMode}> Убрать </button>
                                     

                                {totalSort.length !==0
                                        ?<div className={s.statisticTable}>
                                            <div className={s.statisticName}>
                                                <span className={s.statisticNameCateg}>Категория:</span>
                                                <span className={s.statisticNameDate}>Дата:</span>
                                                <span className={s.statisticNameSumm}>Сумма:</span>
                                            </div>

                                            {totalSort.map(a =>
                                                <div key={a.id} className={s.statisticDate}>
                                                    <span className={s.statisticDateName}> {a.name} </span>
                                                    <span className={s.statisticDateTime}>  
                                                    {a.time.slice(8,10)+'.'+ a.time.slice(5,7)+ '.' 
                                                    + a.time.slice(2,4)+ ' '+ a.time.slice(-5)}</span>
                                                    <span className={s.statisticDateNum}> {a.num} </span>

                                                </div>)}
                                        </div>  
                                        : <div> <Message textMessage={textMessage} idMessage='messageTableTotal'/></div>
                                            }
                            </div>}
                    </div>
                </div>
                <div className={s.statisticDateDiagramm}>
                    <DiagrammContainer
                    addText={props.addText}
                        addSelectDiagrammStat={props.addSelectDiagrammStat}
                        diagramm={props.diagramm} />
                </div>

            </div>
            <div className={s.totalSumm}>
                <div>Всего потрачено за выбранный период:</div>
                {HocValuta(DiagrammTotal, props, null, totalSumm)}
            </div>
        </div>
    )
}

export default StatisticDate