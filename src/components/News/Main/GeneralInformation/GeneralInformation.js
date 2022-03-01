import React from 'react';
import s from './GeneralInformation.module.css';
import Salary from './Salary/Salary';
import DollarRate from './DollarRate/DollarRate';
import Income from './Income/Income';
import Expenses from './Expenses/Expenses';


const GeneralInformation = (props) => {


    return (
        <div className={s.formExpenses}>
            <Salary
                exchangeRates={props.exchangeRates}
                diagramm={props.diagramm}
                addSalary={props.addSalary}
                addSalaryValueTrue={props.addSalaryValueTrue}
                addText={props.addText}
            />
            <Income
                addSalaryValueTrue={props.addSalaryValueTrue}
                addText={props.addText}
                addIncome={props.addIncome} />
            <Expenses
                addDiagramm={props.addDiagramm}
                diagramm={props.diagramm}
                addText={props.addText} />

            <DollarRate
                getEuroUpdate={props.getEuroUpdate}
                getDollarUpdate={props.getDollarUpdate}
                exchangeRates={props.exchangeRates}
            />
        </div>
    )
}

export default GeneralInformation


