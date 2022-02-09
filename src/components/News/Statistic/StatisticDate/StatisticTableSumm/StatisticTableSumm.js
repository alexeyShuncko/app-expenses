import React from "react";
import s from './StatisticTableSumm.module.css';



const StatisticTableSumm = (props) => {


    const total = props.filterTable.map(a => a.num).reduce((sum, current) => sum + current, 0)

  
  
    return (<div  className={s.item}>
        {props.editBYN === "BYN"
            ?   <span  className={s.itemName}>{total} </span>
            :  <span className={s.itemName}> {(total / props.diagramm.dollar.Cur_OfficialRate).toFixed(2)}</span>
    }
            
    </div>
    )
}

export default StatisticTableSumm