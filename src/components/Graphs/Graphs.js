import React from 'react';
import s from './Graphs.module.css';
import { connect } from 'react-redux';
import GrafsExpenses from './GrafsExpenses/GrafsExpenses';
import GrafsForm from './GrafsForm/GrafsForm';
import { addPeriod, addGrafSelectValuta, 
    addText, addGrafSelect, addActivHedgehog } from './../../Redux/diagrammReducer';
import GrafsIncome from './GrafIncome/GrafsIncome';


const Grafs = (props) => {


    return (
        <div className={s.graff}>
            <GrafsForm
                addGrafSelectValuta={props.addGrafSelectValuta}
                grafSelectValuta={props.expenses.grafSelectValuta}
                addGrafSelect={props.addGrafSelect}
                grafSelect={props.expenses.grafSelect}             
                addPeriod={props.addPeriod}
                periodGraf={props.expenses.period[1]}
                addText={props.addText}
                todayPo={props.expenses.today.po}
                todayS={props.expenses.today.s}
                addActivHedgehog={props.addActivHedgehog}/>

            { props.expenses.grafSelect === 'расходов'

            ? <GrafsExpenses
            category={props.expenses.category}
            dollar={props.expenses.exchangeRates.dollar.Cur_OfficialRate}
            euro={props.expenses.exchangeRates.euro.Cur_OfficialRate}
            grafSelectValuta={props.expenses.grafSelectValuta}
            periodGraf={props.expenses.period[1]}
            todayPo={props.expenses.today.po}
            todayS={props.expenses.today.s}/>
            
            : <GrafsIncome
            income={props.expenses.income}
            dollar={props.expenses.exchangeRates.dollar.Cur_OfficialRate}
            euro={props.expenses.exchangeRates.euro.Cur_OfficialRate}
            grafSelectValuta={props.expenses.grafSelectValuta}
            periodGraf={props.expenses.period[1]}
            todayPo={props.expenses.today.po}
            todayS={props.expenses.today.s}/>

            }
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    }
}

export default connect(mapStateToProps, { 
    addPeriod,  addGrafSelectValuta, addText, addGrafSelect, addActivHedgehog
})(Grafs)

