import React from 'react';
import s from './SalaryValue.module.css';



const SalaryValue = (props) => {

    return (
            <span className={s.itemValue} onClick={props.activateEditMode}>{props.editBYN === 'BYN'
                ? (props.diagramm.salary.salaryNum)
                : (props.diagramm.salary.salaryNum / props.diagramm.dollar.Cur_OfficialRate).toFixed(2)
            } </span>
       
    )
}

export default SalaryValue

