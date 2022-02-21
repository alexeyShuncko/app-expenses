import React from 'react';
import s from './GrafsForm.module.css';



const GrafsForm = (props) => {

    const time = new Date()
    function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return '20' + yy + '-' + mm + '-' + dd
    }
    const data = formatDate(time)


    let grafPeriodSMax = // чтобы запретить выбор одного числа с и по
    formatDate(new Date(new Date(props.periodPo).setDate(new Date(props.periodPo).getDate() - 1)))

    let grafPeriodPoMin = // чтобы запретить выбор одного числа с и по
    formatDate(new Date(new Date(props.periodS).setDate(new Date(props.periodS).getDate() + 1)))
    let grafPeriodPoMax = // чтобы график был по сегодняшнее число включительно
    formatDate(new Date(new Date(data).setDate(new Date(data).getDate() + 1)))

    const grafPeriodS = (e) => {
        props.addGrafS(e.target.value)
    }
    const grafPeriodPo = (e) => {
        props.addGrafPo(e.target.value)
    }
    return (
        <div className={s.grafsForm}> График расходов в BYN
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

