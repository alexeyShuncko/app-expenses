import React from 'react';
import { DateFunc } from '../../helpers/DateFunc/DateFunc';
import HedgehogFunc from '../../helpers/HedgehodFunc/HedgehogFunc';
import s from './GrafsForm.module.css';



const GrafsForm = (props) => {

    const activGrafSelect = (e) => {
        props.addGrafSelect(e.target.value)
        HedgehogFunc(props.addText, `Расходы на графике в ${e.target.value} ...`)
    }

    const data = DateFunc(new Date())


    let grafPeriodSMax = // чтобы запретить выбор одного числа с и по
    DateFunc(new Date(new Date(props.periodPo).setDate(new Date(props.periodPo).getDate() - 1)))

    let grafPeriodPoMin = // чтобы запретить выбор одного числа с и по
    DateFunc(new Date(new Date(props.periodS).setDate(new Date(props.periodS).getDate() + 1)))
    let grafPeriodPoMax = // чтобы график был по сегодняшнее число включительно
    DateFunc(new Date(new Date(data).setDate(new Date(data).getDate() + 1)))

    const grafPeriodS = (e) => {
        props.addGrafS(e.target.value)
    }
    const grafPeriodPo = (e) => {
        props.addGrafPo(e.target.value)
    }
    return (
        <div className={s.grafsForm}> 
        <span className={s.grafTitle}>Графики расходов в</span>
            <select
                className={s.fieldBynUsd}
                defaultValue={props.grafSelect}
                onChange={activGrafSelect} >
                <option value="BYN">BYN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select>
            с: <input
                type='date'
                onChange={grafPeriodS}
                min='2022-02-01'
                max={grafPeriodSMax}
                defaultValue={props.periodS}
            />
            по: <input
                type='date'
                onChange={grafPeriodPo}
                min={grafPeriodPoMin}
                max={grafPeriodPoMax}
                defaultValue={props.periodPo}
            />
        </div>
    )
}



export default GrafsForm

