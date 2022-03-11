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
                addText={props.addText}
            />
            <Income
             addActivHedgehog= {props.addActivHedgehog}
            data={props.data}
                addText={props.addText}
                addIncome={props.addIncome}
                addSalaryMonth={props.addSalaryMonth} />
            <Expenses
             addActivHedgehog= {props.addActivHedgehog}
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


