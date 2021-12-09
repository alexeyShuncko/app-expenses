import React, { useState } from "react";
import s from './StatisticTableSumm.module.css';
import FormBynUsd from "../../../helpers/FormBynUsd/FormBynUsd";


const StatisticTableSumm = (props) => {


    const styles = {
        borderBottom: `solid 2px ${props.category.filter(a => props.activ 
            ? a.nameRus===props.activ 
            :a.nameRus===props.category[0].nameRus)[0].color}`
    }
    const total = props.filterTable.map(a => a.num).reduce((sum, current) => sum + current, 0)

    let [editBYN, setEditBYN] = useState("BYN")

    const activEditBYN =(value)=> {
        if (value !== editBYN)
       setEditBYN(value) 
    }
  
    return (<div style={styles} className={s.item}>
        {editBYN === "BYN"
            ?   <span  className={s.itemName}>{total} </span>
            :  <span className={s.itemName}> {(total / props.dollar).toFixed(2)}</span>
    }
            <span className={s.itemValue}><FormBynUsd addSelect={activEditBYN} editBYN={editBYN} /></span>
    </div>
    )
}

export default StatisticTableSumm