import React from 'react';
import PeriodMaxMin from '../../helpers/DateSelect/PeriodMaxMin';
import HedgehogFunc from '../../helpers/HedgehodFunc/HedgehogFunc';
import s from './GrafsForm.module.css';



const GrafsForm = (props) => {

    const activGrafSelect = (e) => {
        props.addGrafSelectValuta(e.target.value)
        
        props.addText(`Расходы на графике в ${e.target.value} ...`)
        props.addActivHedgehog(true)
        HedgehogFunc()
    }


    const grafPeriodS = (e) => {
        props.addGrafS(e.target.value)
    }
    const grafPeriodPo = (e) => {
        props.addGrafPo(e.target.value)
    }

    const selectChange = (e) => {
        props.addGrafSelect(e.target.value)
    }

    return (
        <div className={s.grafsForm}>
            <div>
                <span className={s.grafTitle}>График
                    <select
                        className={s.selectDiag}
                        onChange={selectChange}
                        defaultValue={props.grafSelect}>
                        <option>расходов</option>
                        <option>доходов</option>
                    </select> в</span>
                <select
                    className={s.fieldBynUsd}
                    defaultValue={props.grafSelectValuta}
                    onChange={activGrafSelect} >
                    <option value="BYN">BYN</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
            <div className={s.grafTitle}>
                с: <input
                    type='date'
                    onChange={grafPeriodS}
                    min='2021-01-01'
                    max={PeriodMaxMin(props.periodPo,props.todayPo, 'S')}
                    defaultValue={props.periodS || props.todayS}
                />
                по: <input
                    type='date'
                    onChange={grafPeriodPo}
                    min={PeriodMaxMin(props.periodS ,props.todayS)}
                    max={props.todayPo}
                    defaultValue={props.periodPo || props.todayPo}
                />
            </div>
        </div>
    )
}


export default GrafsForm

