import React from 'react';
import s from './SalaryValue.module.css';



const SalaryValue = (props) => {

    return (
        <span className={s.item}>
            <span className={s.salaryName}
                title="Нажми, чтобы изменить)" onClick={props.activateEditMode}>Зарплата: </span>

            <span className={s.itemValue}>{props.editBYN === 'BYN'
                ? (props.diagramm.salary.salaryNum)
                : (props.diagramm.salary.salaryNum / props.diagramm.dollar.Cur_OfficialRate).toFixed(2)
            } </span>
        </span>
    )
}

export default SalaryValue

