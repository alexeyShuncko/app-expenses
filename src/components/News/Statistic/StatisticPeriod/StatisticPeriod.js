import React from "react";
import s from './StatisticPeriod.module.css';
import RelativityStatistic from './RelativityStatistic/RelativityStatistic';
//import PeriodMaxMin from "../../helpers/DateSelect/PeriodMaxMin";
import DateAnt from "../../helpers/Date/DateAnt";
import { Select } from "antd";



const StatisticPeriod = (props) => {


    const diagramm = props.diagramm.category

    !props.diagramm.activ.name && props.addActiv(diagramm[0].nameRus)

    const onChangeDate =(data, dateString)=> {
        props.addPeriod('table',dateString)
        // props.addText('Период изменён ...')
        // props.addActivHedgehog(true) условие надо
    }

    const handleChange =(value)=> {
        if (value !== props.diagramm.activ.name) {
            props.addActiv(value)

            props.addText(`Категория "${value}" выбрана  ...`)
            props.addActivHedgehog(true)
        }
    }
    return (

        <div className={s.categoryStatistic}>
            <div className={s.category}>
                <div className={s.nameArrow}>
                    <div>
                        <div className={s.categoryStatisticName}>
                            Выберите категорию :
                        </div>

                        <Select 
                        style={{ width: 120 }}
                        onChange={handleChange}
                        defaultValue= {diagramm[0].nameRus}>
                           
                                {diagramm.map(a =>
                                <Select.Option  value={a.nameRus}
                                    key={a.nameRus}
                                    name={a.nameRus}
                                    //style={{ backgroundColor: ` ${a.color}` }}
                                    >
                                    {a.nameRus}
                                </Select.Option >)}
                        </Select>

                    </div>
                </div>
               
             <RelativityStatistic diagramm={props.diagramm} />
              
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