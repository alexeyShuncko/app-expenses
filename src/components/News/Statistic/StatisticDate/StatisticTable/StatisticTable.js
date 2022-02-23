import React, { useState } from "react";
import s from './StatisticTable.module.css';
import HocValuta from "../../../HOC/HocValuta";
import HedgehogFunc from "../../../helpers/HedgehodFunc/HedgehogFunc";
import ArrowFunc from "../../../helpers/ArrowFunc/ArrowFunc";
import OffStyle from './../../../helpers/ArrowFunc/Offstyle';
import Message from "../../../helpers/Message/Message";
import { DataTransformation } from "../../../helpers/DataTransformation/DataTransformation";


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
        .filter(b => b.time <= props.diagramm.periodPo && b.time >= props.diagramm.periodS)

    const activateEditMode = () => {
        if (props.diagramm.activ.name
            && props.diagramm.periodPo
            && props.diagramm.periodS) {
              
                OffStyle(['periodS','periodPo'])

            setEditMode(true)
        }
        else if (!props.diagramm.activ.name) {
            HedgehogFunc(props.addText, 'Выберите категорию ...')
            ArrowFunc('arrowCategory', 'inputCategoryStatistic', 'buttonTable')
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

    let  textMessage = 
    `Нет расходов с ${ DataTransformation(props.diagramm.periodS)} 
    по ${DataTransformation(props.diagramm.periodPo)} 
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
                                    <span className={s.statisticDateTime}>
                                        {DataTransformation(a.time)}
                                    </span>
                                    <span className={s.statisticDateNum}> {a.num} </span>
                                </div>)}

                            </div>
                            <div className={s.statisticDateSumm} 
                            //style={styles}
                            >
                                Потрачено на <span className={s.categorySumm}>
                                    {props.diagramm.activ.name && 
                                    category.filter(a=> a.idCategory===props.diagramm.activ.id)[0].nameRusСase} 
                                    </span>
                                <div> за выбранный период: </div>
                                <div className={s.totalCAtegory}>
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