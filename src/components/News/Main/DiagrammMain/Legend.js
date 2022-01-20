import React from 'react';
import s from './Legend.module.css';


const Legend = (props) => {

    const diagramm = props.diagramm.category


    return (
        <div className={s.Legend}>
            {diagramm.map(a=> 
            <div key={a.nameRus}>
               <span className={s.legend} style={{ backgroundColor: ` ${a.color}` }}>&nbsp;</span>
               <span> - {a.nameRus}</span> 
               </div>
               )}
        </div>
    )
}
export default Legend;



