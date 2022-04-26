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
import { addText, addIncome, addSalaryMonth, 
    addActivHedgehog, sources, categories } from './../../../Redux/diagrammReducer';
import { getIncomes, putSourcesId, postIncomes,
     getIncomesId, putIncomesId,deleteIncomesId, getSources, postIncomesId, postSources, deleteSources,
     putSources, putСategories, postExpenses
 } from '../../../API/api.js';
import { Button } from 'antd';




const Main = (props) => {

    const allFetch = () => {
        // getSources()
        //   putSources('Другие', 'rgb(224, 83, 118)', 3)
    props.categories()
     props.sources()
// postIncomes('2022-04-25', 130, 1)
// .then(getSources())
// putСategories('Транспорт', 'rgb(22, 153, 40)',4)
       

// postExpenses('2022-04-26', 26, 1).then(()=> props.categories())
     }




    return (
        <div className={s.main}>

            <Button onClick={allFetch}>Запрос</Button>

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
                    addActivHedgehog={props.addActivHedgehog}
                />
            </div>

            <div className={s.mainDiagramm}>
                <DiagrammMain
                    addActivHedgehog={props.addActivHedgehog}
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
        addEditColor, getDollarUpdate, getEuroUpdate, addText, addIncome, 
        addSalaryMonth, addActivHedgehog, sources, categories
    })(Main)




