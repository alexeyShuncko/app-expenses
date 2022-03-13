import React from 'react';
import FormSelectDiagramm from '../../helpers/FormSelectDiagramm/FormSelectDiagramm';
import DiagrammTop from './DiagrammTop/DiagrammTop';
import s from './DiagrammMain.module.css';
import HedgehogFunc from '../../helpers/HedgehodFunc/HedgehogFunc';


const DiagrammMain = (props) => {


    const onSelectChange = (value) => {
        props.addSelectDiagramm(value)
     
        props.addText( `Значения диаграммы в ${value} ...`)
        props.addActivHedgehog(true)
        HedgehogFunc()
    }

    return (
        <div className={s.diagrammMain}>

            <div className={s.diagrammMainName}>
                Диаграмма расходов по всем категориям
                <div className={s.select}>
                    <span className={s.selectText}> за всё время в </span>
                    <span className={s.selectValue}> 
                    <FormSelectDiagramm 
                    addSelect={onSelectChange} 
                    select={props.diagramm.selectDiagramm} /></span>
                </div>
            </div>

            <div className={s.diagrammMainDiagramm}>
                <DiagrammTop 
                diagramm={props.diagramm} 
                selectDiagramm={props.diagramm.selectDiagramm}
                dollar={props.diagramm.exchangeRates.dollar.Cur_OfficialRate}
                euro={props.diagramm.exchangeRates.euro.Cur_OfficialRate}/>
              
            </div>

        </div>
    )
}
export default DiagrammMain




