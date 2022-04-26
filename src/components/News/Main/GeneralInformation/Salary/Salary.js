import React from 'react';
import s from './Salary.module.css';
import HocValuta from '../../../HOC/HocValuta';
import { DateFunc } from '../../../helpers/DateFunc/DateFunc';


const Salary = (props) => {

    const timer = DateFunc(new Date())  //сегодняшняя дата в формате гггг-мм-дд

    let total = props.diagramm.income.data
        .map(a => a.data
            .map(b => b.amount)
            .reduce((sum, cur) => sum + cur, 0))
        .reduce((sum, cur) => sum + cur, 0)


    return (

        <div className={s.salary}>
            {props.diagramm.income.salary.Date.day &&
                timer >= `2022-${props.diagramm.income.salary.Date.month || timer.slice(5, 7)}-${props.diagramm.income.salary.Date.day}`
                ? <div className={s.salaryUpdate} >Вы получили зарплату!</div>
                : null}
            {props.diagramm.income.prepayment.Date.day &&
                timer >= `2022-${props.diagramm.income.prepayment.Date.month || timer.slice(5, 7)}-${props.diagramm.income.prepayment.Date.day}`
                ? <div className={s.salaryUpdate} >Вы получили аванс!</div>
                : null}

            <div className={s.salaryValue}>
                <div className={s.salaryName}>Доходы:</div>
                <div>
                    <HocValuta
                        value='salary'
                        exchangeRates={props.exchangeRates}
                        salary={total || 0}
                    />
                </div>
            </div>

            <div className={s.salaryValue}>
                <div className={s.salaryName}>Расходы:</div>
                <HocValuta
                    value='salarySpent'
                    exchangeRates={props.exchangeRates}
                    salary={total || 0}
                    category={props.diagramm.category} />
            </div>

            <div className={s.salaryValue}>
                <div className={s.salaryName}>Баланс:</div>
                <HocValuta
                    value='salaryRemainder'
                    exchangeRates={props.exchangeRates}
                    salary={total || 0}
                    category={props.diagramm.category} />
            </div>
        </div>
    )
}


export default Salary

