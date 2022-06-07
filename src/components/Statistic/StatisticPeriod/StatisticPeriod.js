import React from "react";
import s from './StatisticPeriod.module.css';
import RelativityStatistic from './RelativityStatistic/RelativityStatistic';
import DateAnt from "../../helpers/Date/DateAnt";
import { Select } from "antd";
import Converter_V_RGB from "../../helpers/converter/converter";



const StatisticPeriod = (props) => {


    const diagramm = props.diagramm.category

    let color = Converter_V_RGB(diagramm.find(a => a.id === props.diagramm.activ.id).color)
    


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
                            defaultValue={props.diagramm.activ.name || diagramm[0].name}
                        >

                            {diagramm.map(a =>
                                <Select.Option value={a.name}
                                    key={a.id}
                                    name={a.name}
                                    style={{
                                        backgroundColor: `rgba(${a.color.slice(4, -1)},0.6)`
                                    }}
                                >
                                    {a.name}
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