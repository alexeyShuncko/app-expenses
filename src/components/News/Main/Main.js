import React from 'react';
import s from './Main.module.css';
import GeneralInformation from './GeneralInformation/GeneralInformation';
import { connect } from 'react-redux';
import {
    addDiagramm, addActiv,
    addSelectDiagramm, addEditColor,
    getDollarUpdate, getEuroUpdate
} from '../../../Redux/diagrammReducer';
import DiagrammMain from './DiagrammMain/DiagrammMain';
import { addText, addIncome, addSalaryMonth } from './../../../Redux/diagrammReducer';


const Main = (props) => {

    return (
        <div className={s.main}>

            <div className={s.mainInform}>
                <GeneralInformation
                    exchangeRates={props.diagramm.exchangeRates}
                    addDiagramm={props.addDiagramm}
                    data={props.diagramm.income.data}
                    diagramm={props.diagramm}
                    getEuroUpdate={props.getEuroUpdate}
                    getDollarUpdate={props.getDollarUpdate}
                    addText={props.addText}
                    addIncome={props.addIncome}
                    addSalaryMonth={props.addSalaryMonth}
                />
            </div>

            <div className={s.mainDiagramm}>
                <DiagrammMain
                    addText={props.addText}
                    addSelectDiagramm={props.addSelectDiagramm}
                    diagramm={props.diagramm}
                    addEditColor={props.addEditColor} />
            </div>


        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        diagramm: state.expenses
    }
}

export default connect(mapStateToProps,
    {
        addDiagramm, addActiv, addSelectDiagramm,
         addEditColor, getDollarUpdate, getEuroUpdate, addText, addIncome, addSalaryMonth
    })(Main)




