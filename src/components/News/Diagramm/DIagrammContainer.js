import React from "react";
import s from './DiagrammContainer.module.css';
import DiagrammExpenses from "./DiagrammExpenses/DiagrammExpenses";
import { connect } from 'react-redux';
import { addDiagrammPo, addDiagrammS,
    addSelectDiagrammStat, addText, addDiagrammSelect } from './../../../Redux/diagrammReducer';
import DiagrammForm from './DiagrammForm/DiagrammForm';
import DiagrammIncome from "./DiagrammIncome/DiagrammIncome";


const DiagrammContainer = (props) => {



    return (
        <div>
            <DiagrammForm
                selectDiagrammStat={props.diagramm.selectDiagrammStat}
                diagrammSelect={props.diagramm.diagrammSelect}
                addSelectDiagrammStat={props.addSelectDiagrammStat}
                addDiagrammS={props.addDiagrammS}
                addDiagrammPo={props.addDiagrammPo}
                periodS={props.diagramm.diagramm.s}
                periodPo={props.diagramm.diagramm.po}
                addDiagrammSelect={props.addDiagrammSelect}
                addText={props.addText}
                todayPo={props.diagramm.today.po}
                todayS={props.diagramm.today.s}/>
                
            <div className={s.diagramm}>
                <div className={s.pie}>
                    {props.diagramm.diagrammSelect === 'расходов'
                        ? <DiagrammExpenses

                            diagramm={props.diagramm.category}
                            periodPo={props.diagramm.diagramm.po}
                            periodS={props.diagramm.diagramm.s}
                            selectDiagramm={props.diagramm.selectDiagrammStat}
                            dollar={props.diagramm.exchangeRates.dollar.Cur_OfficialRate}
                            euro={props.diagramm.exchangeRates.euro.Cur_OfficialRate} 
                            todayPo={props.diagramm.today.po}
                            todayS={props.diagramm.today.s}/>
                        : <DiagrammIncome
                            income={props.diagramm.income.data}
                            periodPo={props.diagramm.diagramm.po}
                            periodS={props.diagramm.diagramm.s}
                            selectDiagramm={props.diagramm.selectDiagrammStat}
                            dollar={props.diagramm.exchangeRates.dollar.Cur_OfficialRate}
                            euro={props.diagramm.exchangeRates.euro.Cur_OfficialRate} 
                            todayPo={props.diagramm.today.po}
                            todayS={props.diagramm.today.s}/>
                    }
                </div>
            </div>
        </div>)
}
let mapStateToProps = (state) => {
    return {
        diagramm: state.expenses
    }
}


export default connect(mapStateToProps, {
    addDiagrammS, addDiagrammPo,
    addSelectDiagrammStat, addText, addDiagrammSelect
})(DiagrammContainer)