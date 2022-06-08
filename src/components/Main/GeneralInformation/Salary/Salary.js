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

        const getMount = (mount) => String(mount).length > 1 ? mount : `0${mount}`




    return (

        <div className={s.salary}>
            {timer >= `2022-${getMount(props.diagramm.income.salary.find(a => a.source === 1).salary_month)}-${getMount(props.diagramm.income.salary.find(a => a.source === 1).salary_day)}`
                ? <div className={s.salaryUpdate} >Вы получили зарплату!</div>
                : null}
            {timer >= `2022-${getMount(props.diagramm.income.salary.find(a => a.source === 3).salary_month)}-${getMount(props.diagramm.income.salary.find(a => a.source === 3).salary_day)}`
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

