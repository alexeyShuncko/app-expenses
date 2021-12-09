import React, { useState } from "react";
import FormBynUsd from "../../../../helpers/FormBynUsd/FormBynUsd";
import s from './DiagrammTotal.module.css';



const DiagrammTotal = (props) => {

    
    let [editBYN, setEditBYN] = useState("BYN")

    const activEditBYN =(value)=> {
        if (value !== editBYN)
       setEditBYN(value) 
    }

    return (
        <div className={s.diagrammSummValue}>
            {editBYN === "BYN"
                ? <span className={s.itemNum}>{props.total}</span>
                : <span className={s.itemNum}> {(props.total / props.dollar).toFixed(2)}</span>
            }
            <span className={s.itemValuta}><FormBynUsd addSelect={activEditBYN} editBYN={editBYN}/></span>
        </div>
        )
}


export default DiagrammTotal