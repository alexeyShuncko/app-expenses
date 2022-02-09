import React from 'react';
import s from './SalarySpent.module.css';

const SalarySpent = (props) => {


    const totalSumm = props.diagramm.category.map(a =>a && a.summ).reduce((acc, num) => acc + num, 0)

    return (
        <div className={s.salarySpentValue}> {props.editBYN === 'BYN'
            ? totalSumm.toFixed(2)
            : (totalSumm / props.diagramm.dollar.Cur_OfficialRate).toFixed(2)
        } </div>
   
    )
}

export default SalarySpent

