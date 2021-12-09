import React, { useEffect} from 'react';
import s from './News.module.css';
import Diagram from './DiagrammMain/Diagram';
import  FormDiagram  from './GeneralInformation/FormDiagramm/FormDiagram';
import { connect } from 'react-redux';
import { addDiagramm, addActiv, addSalary, 
    addSelectDiagramm, addSalaryValueTrue, addEditColor,
     getDollarUpdate } from '../../../Redux/diagrammReducer';
import DiagrammMain from './DiagrammMain/DiagrammMain';


const News =(props)=> {

let arrayTotal = props.diagramm.category.map(a =>a && a.summ)
let color =props.diagramm.category.map(a =>a && a.color)
let totalSumm = props.diagramm.category.map(a =>a && a.summ).reduce((acc, num) => acc + num, 0)


    useEffect(() => {
        Diagram(arrayTotal,color,totalSumm, props.diagramm.selectDiagramm, props.diagramm.dollar.Cur_OfficialRate)
         }, [arrayTotal,color,totalSumm, props.diagramm.selectDiagramm,props.diagramm.dollar.Cur_OfficialRate]
    );
    
        return (
            <div className={s.news}>
                
                <div className={s.newsItems}>
                    <FormDiagram
                        addDiagramm={props.addDiagramm}
                        diagramm={props.diagramm}
                        addSalary={props.addSalary}
                        getDollarUpdate={props.getDollarUpdate}
                        addSalaryValueTrue={props.addSalaryValueTrue}
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
        addSalaryValueTrue , addEditColor, getDollarUpdate})(News)




