import React from 'react';
import s from './Graphs.module.css';
import { connect } from 'react-redux';
import GrafsExpenses from './GrafsExpenses/GrafsExpenses';
import GrafsForm from './GrafsForm/GrafsForm';
import { addGrafS, addGrafPo, addGrafSelectValuta, 
    addText, addGrafSelect, addActivHedgehog } from './../../../Redux/diagrammReducer';
import GrafsIncome from './GrafIncome/GrafsIncome';


const Grafs = (props) => {


    return (
        <div className={s.graff}>
            <GrafsForm
                addGrafSelectValuta={props.addGrafSelectValuta}
                grafSelectValuta={props.expenses.grafSelectValuta}
                addGrafSelect={props.addGrafSelect}
                grafSelect={props.expenses.grafSelect}
                periodPo={props.expenses.grafs.poGrafs}
                periodS={props.expenses.grafs.sGrafs}
                addGrafS={props.addGrafS}
                addGrafPo={props.addGrafPo}
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
            periodS={props.expenses.grafs.sGrafs}
            periodPo={props.expenses.grafs.poGrafs}
            todayPo={props.expenses.today.po}
            todayS={props.expenses.today.s}/>
            
            : <GrafsIncome
            income={props.expenses.income}
            dollar={props.expenses.exchangeRates.dollar.Cur_OfficialRate}
            euro={props.expenses.exchangeRates.euro.Cur_OfficialRate}
            grafSelectValuta={props.expenses.grafSelectValuta}
            periodS={props.expenses.grafs.sGrafs}
            periodPo={props.expenses.grafs.poGrafs}
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
    addGrafS, addGrafPo, addGrafSelectValuta, addText, addGrafSelect, addActivHedgehog
})(Grafs)

