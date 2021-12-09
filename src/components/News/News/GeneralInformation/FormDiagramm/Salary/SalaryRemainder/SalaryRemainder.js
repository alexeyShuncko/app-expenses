import React from 'react';
import s from './SalaryRemainder.module.css';

const SalaryRemainder = (props) => {

  
    const totalSumm = props.diagramm.category.map(a =>a && a.summ).reduce((acc, num) => acc + num, 0)

    return (<div className={s.salaryRemainder}>

        <div className={s.balanceName}> Должно остаться: </div>
        <div className={s.salaryRemainderValue}> {props.editBYN === 'BYN'
            ? (props.diagramm.salary.salaryNum - totalSumm).toFixed(2)
            : ((props.diagramm.salary.salaryNum - totalSumm) / props.diagramm.dollar.Cur_OfficialRate).toFixed(2)
        } </div> 
    </div>

    )
}

export default SalaryRemainder

