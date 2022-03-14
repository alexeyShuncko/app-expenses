import React, { useState } from "react";
import s from './StatisticTable.module.css';
import HocValuta from "../../HOC/HocValuta";
import ArrowFunc from "../../helpers/ArrowFunc/ArrowFunc";
import Message from "../../helpers/Message/Message";
import { DataTransformation } from "../../helpers/DataTransformation/DataTransformation";


const StatisticTable = (props) => {

    let [editMode, setEditMode] = useState(false)

    
    const styles = {
        borderBottom: `solid 3px ${props.diagramm.category.filter(a => props.diagramm.activ.id 
            ? a.idCategory===props.diagramm.activ.id
            : a.idCategory===props.diagramm.category[0].idCategory)[0].color}`
    }


    const category = props.diagramm.category

    let filterTable = category
        .filter(a => props.diagramm.activ.id
            ? a.idCategory === props.diagramm.activ.id
            : a.nameRus === category[0].nameRus)[0].data
        .filter(b => b.time <= (props.diagramm.periodPo || props.diagramm.today.po) 
        && b.time >= (props.diagramm.periodS || props.diagramm.today.s))

    const activateEditMode = () => {
       
         if (!props.diagramm.activ.name) {

            props.addText('Выберите категорию ...')
            props.addActivHedgehog(true)
            ArrowFunc('arrowCategory', 'inputCategoryStatistic', 'buttonTable')
        }
        else  setEditMode(true)
       
    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }

    let dateS = DataTransformation(props.diagramm.periodS || props.diagramm.today.s)
    let datePo = DataTransformation(props.diagramm.periodPo || props.diagramm.today.po)

    let  textMessage = 
    `Нет расходов с ${dateS} по ${datePo} 
    на "${props.diagramm.activ.name && category.filter(a=> a.idCategory===props.diagramm.activ.id)[0].nameRusСase}" ...`
      

    return (
            <div className={s.statisticDateTable}>
                <div>Таблица расходов по выбранной категории за выбранный период. </div>
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
                        {filterTable.length !==0
                        ? <div>
                            <div className={s.statisticTable}>
                                <div className={s.statisticName}>
                                    <span className={s.statisticNameDate}>Дата:</span>
                                    <span className={s.statisticNameSumm}>Сумма:</span>
                                </div>

                                {filterTable.map(a => <div key={a.id} className={s.table}>
                                    <span className={s.tableTime}>
                                        {DataTransformation(a.time)}
                                    </span>
                                    <span className={s.tableNum}> {a.num} </span>
                                </div>)}

                            </div>
                            <div className={s.statisticDateSumm} style={styles}>
                                Потрачено на <span className={s.categorySumm}>
                                    {props.diagramm.activ.name && 
                                    category.filter(a=> a.idCategory===props.diagramm.activ.id)[0].nameRusСase} 
                                    </span>
                                <div> с {dateS} по {datePo} </div>
                                <div className={s.totalCategory}>
                                <HocValuta 
                                value='statisticTable' 
                                filterTable={filterTable} 
                                exchangeRates={props.diagramm.exchangeRates}/>
                                </div>

                            </div>
                        </div>
                        : <div>
                            <Message textMessage={textMessage} idMessage='messageTable'/>
                        </div>
                                }
                    </div>}

            </div>
    )
}

export default StatisticTable