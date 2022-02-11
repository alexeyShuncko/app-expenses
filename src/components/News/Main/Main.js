import React, { useEffect} from 'react';
import s from './Main.module.css';
import Diagram from './DiagrammMain/Diagram';
import  FormDiagram  from './GeneralInformation/FormDiagramm/FormDiagram';
import { connect } from 'react-redux';
import { addDiagramm, addActiv, addSalary, 
    addSelectDiagramm, addSalaryValueTrue, addEditColor,
     getDollarUpdate, getEuroUpdate } from '../../../Redux/diagrammReducer';
import DiagrammMain from './DiagrammMain/DiagrammMain';
import { addText } from './../../../Redux/diagrammReducer';


const News =(props)=> {

let arrayTotal = props.diagramm.category.map(a =>a && a.summ)
let color =props.diagramm.category.map(a =>a && a.color)
let totalSumm = props.diagramm.category.map(a =>a && a.summ).reduce((acc, num) => acc + num, 0)
let dollar = props.diagramm.exchangeRates.dollar.Cur_OfficialRate
let euro = props.diagramm.exchangeRates.euro.Cur_OfficialRate

    useEffect(() => {
        Diagram(arrayTotal,color,totalSumm, props.diagramm.selectDiagramm,dollar,euro )
         }, [arrayTotal,color,totalSumm, props.diagramm.selectDiagramm,dollar,euro]
    );
    
        return (
            <div className={s.news}>
                
                <div className={s.newsItems}>
                    <FormDiagram
                    exchangeRates={props.diagramm.exchangeRates}
                        addDiagramm={props.addDiagramm}
                        diagramm={props.diagramm}
                        addSalary={props.addSalary}
                        getEuroUpdate={props.getEuroUpdate}
                        getDollarUpdate={props.getDollarUpdate}
                        addSalaryValueTrue={props.addSalaryValueTrue}
                        addText={props.addText}
                    />
                </div>

                <div className={s.newsItems1}>
                    <DiagrammMain
                        addSelectDiagramm={props.addSelectDiagramm}
                        diagramm={props.diagramm} 
                        addEditColor={props.addEditColor}/>
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
    { addDiagramm, addActiv, addSalary, addSelectDiagramm, 
        addSalaryValueTrue , addEditColor, getDollarUpdate, getEuroUpdate, addText})(News)




