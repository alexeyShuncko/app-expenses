import React from "react";
import s from './StatisticPeriod.module.css';
import RelativityStatistic from './RelativityStatistic/RelativityStatistic';
import ArrowValidate from "../../Arrow/ArrowValidate";
import OffStyle from "../../helpers/ArrowFunc/Offstyle";
//import PeriodMaxMin from "../../helpers/DateSelect/PeriodMaxMin";
import DateAnt from "../../helpers/Date/DateAnt";



const StatisticPeriod = (props) => {

    

    const colorActiv = (e) => {
        if (e.target.value !== props.diagramm.activ.name) {
            props.addActiv(e.target.value)
            OffStyle(['inputCategoryStatistic'])

            props.addText(`Категория "${e.target.value}" выбрана ...`)
            props.addActivHedgehog(true)
        }
    }

    const diagramm = props.diagramm.category


    const onChangeDate =(data, dateString)=> {
        props.addPeriod('table',dateString)
        // props.addText('Период изменён ...')
        // props.addActivHedgehog(true) условие надо
    }

    return (

        <div className={s.categoryStatistic}>
            <div className={s.category}>
                <div className={s.nameArrow}>
                    <div>
                        <div className={s.categoryStatisticName}>
                            Выберите категорию :
                        </div>

                        <select
                            autoFocus='on'
                            id='inputCategoryStatistic'
                            onClick={colorActiv}
                            className={s.option}
                            style={diagramm.map(a => a.idCategory).includes(props.diagramm.activ.id)
                                ? { backgroundColor: diagramm.filter(a => a.idCategory === props.diagramm.activ.id)[0].color }
                                : { backgroundColor: '#ffffff' }}
                        >
                            <option>{props.diagramm.activ.id && diagramm.filter(a => a.idCategory === props.diagramm.activ.id)[0].nameRus} </option>
                            {diagramm.map(a =>
                                <option value={a.nameRus}
                                    key={a.nameRus}
                                    style={{ backgroundColor: ` ${a.color}` }}>
                                    {a.nameRus}
                                </option>)}
                        </select>

                    </div>
                    <div>
                        <ArrowValidate arrowId='arrowCategory' />
                    </div>
                </div>

                <div> {props.diagramm.activ.name
                    ? <RelativityStatistic diagramm={props.diagramm} />
                    : null}
                </div>
            </div>
            <div className={s.period}>
                <div className={s.categoryStatisticName}>Выберите период : </div>
                <DateAnt 
                s={props.diagramm.today.s} 
                po={props.diagramm.today.po}
                onChangeDate={onChangeDate}/>
               
            </div>
        </div>
    )
}


export default StatisticPeriod