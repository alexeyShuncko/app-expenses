import React from 'react';
import s from './Main.module.css';
import GeneralInformation from './GeneralInformation/GeneralInformation';
import { connect } from 'react-redux';
import {
    addDiagramm, addActiv, addSelectDiagramm, 
    getDollarUpdate, getEuroUpdate
} from '../../Redux/diagrammReducer';
import DiagrammMain from './DiagrammMain/DiagrammMain';
import { addText, addIncome, updateSalary,
    addActivHedgehog} from './../../Redux/diagrammReducer';



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
                    addActivHedgehog={props.addActivHedgehog}
                    updateSalary={props.updateSalary} 
                />
            </div>

            <div className={s.mainDiagramm}>
                <DiagrammMain
                    addActivHedgehog={props.addActivHedgehog}
                    addText={props.addText}
                    addSelectDiagramm={props.addSelectDiagramm}
                    diagramm={props.diagramm}
                   />
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
    { addDiagramm, addActiv, addSelectDiagramm, getDollarUpdate, getEuroUpdate,
         addText, addIncome, addActivHedgehog, updateSalary
    })(Main)




