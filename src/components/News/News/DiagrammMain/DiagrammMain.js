import React from 'react';
import FormSelectDiagramm from '../../helpers/FormSelectDiagramm/FormSelectDiagramm';
import s from './DiagrammMain.module.css';
import Legend from './Legend';


const DiagrammMain = (props) => {


    const onSelectChange = (e) => {
        props.addSelectDiagramm(e.target.value)
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
                <canvas id="tutorial" className={s.diagramm}></canvas>
                <div>
                    <Legend
                        diagramm={props.diagramm}
                        addEditColor={props.addEditColor} />
                </div>
            </div>

        </div>
    )
}
export default DiagrammMain




