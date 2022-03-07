import React from "react";
import s from './TotalExpenses.module.css';
import HocValuta from "../../../HOC/HocValuta";
import { DataTransformation } from "../../../helpers/DataTransformation/DataTransformation";
import Message from "../../../helpers/Message/Message";


const TotalTableExpenses = (props) => {

    const category = props.diagramm.category

// фильтрую в зависимости от выбранного периода
    let result = category.map(a => {
            return {
                nameRus: a.nameRus,
                color: a.color,
                data: a.data.filter(b => b.time >= props.diagramm.periodS && b.time <= props.diagramm.periodPo)
            }
        })  


    let newResult = result.map(a => a.data.map(d => { return { 
        name: a.nameRus, color: a.color, time: d.time, num: d.num, id: d.id 
    } }))


    let total = newResult[0].concat(
        newResult[1] ? newResult[1] : [],
        newResult[2] ? newResult[2] : [],
        newResult[3] ? newResult[3] : [],
        newResult[4] ? newResult[4] : [],
        newResult[5] ? newResult[5] : [])  // соединяю массивы ...........


    let totalSort = total.sort((a, b) => a.time > b.time ? 1 : -1)            //сортировка по времени 
    const totalSumm = total.map(a => a.num).reduce((sum, current) => sum + current, 0)

let dateS = DataTransformation(props.diagramm.periodS)
let datePo = DataTransformation(props.diagramm.periodPo)

    let textMessage =
        `Нет расходов с ${dateS} по ${datePo} ...`

    return (
        <div className={s.statisticDateTable}>
           
                    {totalSort.length !== 0
                        ? <div className={s.statisticTable}>
                            <div className={s.statisticName}>
                                <span className={s.statisticNameCateg}>Категория:</span>
                                <span className={s.statisticNameDate}>Дата:</span>
                                <span className={s.statisticNameSumm}>Сумма:</span>
                            </div>

                            {totalSort.map(a =>
                                <div key={a.id} 
                                className={s.statisticDate} 
                                //style={{backgroundColor: `rgba(${a.color.slice(4,-1)},1)`}} для добавления прозрачности
                                >
                                    <span className={s.statisticDateName} style={{backgroundColor: a.color}}> {a.name} </span>
                                    <span className={s.statisticDateTime} style={{backgroundColor: a.color}}>
                                        {DataTransformation(a.time)}</span>
                                    <span className={s.statisticDateNum} style={{backgroundColor: a.color}}> {a.num} </span>

                                </div>)}
                            <div className={s.totalSumm}>
                                <div>
                                Всего потрачено с {dateS} по {datePo}:
                                      </div>
                                <HocValuta
                                    value='statisticTotal'
                                    totalSumm={totalSumm} 
                                    exchangeRates={props.diagramm.exchangeRates} />
                            </div>
                        </div>
                        : <div> 
                            <Message textMessage={textMessage} idMessage='messageTableTotal' />
                            </div>
                    }
                </div>
    )
}

export default TotalTableExpenses