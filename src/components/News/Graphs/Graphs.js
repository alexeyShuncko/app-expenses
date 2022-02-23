import React from 'react';
import s from './Graphs.module.css';
import { connect } from 'react-redux';
import GraphsContainer from './GrafsContainer/GraphsContainer';
import GrafsForm from './GrafsForm/GrafsForm';
import { addGrafS, addGrafPo, addGrafSelect, addText } from './../../../Redux/diagrammReducer';


const Grafs = (props) => {


    return (
        <div className={s.graff}>
            <GrafsForm
                addGrafSelect={props.addGrafSelect}
                grafSelect={props.expenses.grafSelect}
                periodPo={props.expenses.grafs.po}
                periodS={props.expenses.grafs.s}
                addGrafS={props.addGrafS}
                addGrafPo={props.addGrafPo}
                addText={props.addText}
            />
            <GraphsContainer
                category={props.expenses.category}
                dollar={props.expenses.exchangeRates.dollar.Cur_OfficialRate}
                euro={props.expenses.exchangeRates.euro.Cur_OfficialRate}
                grafSelect={props.expenses.grafSelect}
                periodS={props.expenses.grafs.s}
                periodPo={props.expenses.grafs.po}
            />
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    }
}

export default connect(mapStateToProps, { addGrafS, addGrafPo, addGrafSelect, addText })(Grafs)

