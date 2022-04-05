import React from "react";
import s from './StatisticPeriod.module.css';
import RelativityStatistic from './RelativityStatistic/RelativityStatistic';
import DateAnt from "../../helpers/Date/DateAnt";
import { Select } from "antd";





const StatisticPeriod = (props) => {


    const diagramm = props.diagramm.category

    let color = diagramm.filter(a => a.idCategory === props.diagramm.activ.id)[0].color


    const onChangeDate = (data, dateString) => {
        props.addPeriod('table', dateString)
        // props.addText('Период изменён ...')
        // props.addActivHedgehog(true) условие надо
    }

    const handleChange = (value) => {
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
                            className={s.qqq}
                            style={{
                                width: 170,
                                backgroundColor: `rgba(${color.slice(4, -1)},0.6)`
                            }}
                            onChange={handleChange}
                            defaultValue={props.diagramm.activ.name || diagramm[0].nameRus}
                        >

                            {diagramm.map(a =>
                                <Select.Option value={a.nameRus}
                                    key={a.nameRus}
                                    name={a.nameRus}
                                    style={{
                                        backgroundColor: `rgba(${a.color.slice(4, -1)},0.6)`
                                    }}
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
                    period={props.tablePeriod}
                    s={props.diagramm.today.s}
                    po={props.diagramm.today.po}
                    onChangeDate={onChangeDate} />
            </div>
        </div>
    )
}


export default StatisticPeriod