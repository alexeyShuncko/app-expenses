import React from "react";
import s from './DiagrammTotal.module.css';



const DiagrammTotal = (props) => {

    return (
            <div className={s.SummValue}>{props.editBYN === "BYN"
                ? props.totalSumm
                : (props.totalSumm / props.diagramm.dollar.Cur_OfficialRate).toFixed(2)
            }
            </div>
        )
}


export default DiagrammTotal