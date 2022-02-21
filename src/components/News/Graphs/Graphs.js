import React from 'react';
import s from './Graphs.module.css';
import { connect } from 'react-redux';
import GraphsContainer from './GrafsContainer/GraphsContainer';
import GrafsForm from './GrafsForm/GrafsForm';
import { addGrafS,addGrafPo } from './../../../Redux/diagrammReducer';


const Grafs = (props) => {


    return (
        <div className={s.graff}>
            <GrafsForm 
            periodPo={props.expenses.grafs.po}
            periodS={props.expenses.grafs.s}
            addGrafS={props.addGrafS}
            addGrafPo={props.addGrafPo}/>
            <GraphsContainer 
            expenses = {props.expenses}
            />
           </div>
    )
}

let mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    }
}

export default connect(mapStateToProps,{addGrafS,addGrafPo})(Grafs)

