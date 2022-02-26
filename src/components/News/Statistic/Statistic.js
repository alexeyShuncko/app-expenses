import React from "react";
import s from './Statistic.module.css';
import StatisticDate from './StatisticDate/StatisticDate';
import {
    addActiv, addPeriodS, addPeriodPo, addText
} from '../../../Redux/diagrammReducer';
import { connect } from 'react-redux';
import StatisticTable from "./StatisticTable/StatisticTable";
import StatisticPeriod from "./StatisticPeriod/StatisticPeriod";


const Statistic = (props) => {


    return (
        <div className={s.statistic}>

                <div className={s.period}>
                    <StatisticPeriod
                        diagramm={props.diagramm}
                        addActiv={props.addActiv}
                        addPeriodS={props.addPeriodS}
                        addPeriodPo={props.addPeriodPo}
                        addText={props.addText}/>
                </div>

                <div className={s.tables}>
                    <div className={s.tableCategory}>
                    <StatisticTable
                        addText={props.addText}
                        diagramm={props.diagramm}/>
                    </div>
                   <div className={s.tableDate}>
                   <StatisticDate
                        diagramm={props.diagramm}
                        addText={props.addText}/>
                   </div> 
                </div>
        </div>

    )
}
let mapStateToProps = (state) => {
    return {
        diagramm: state.expenses
    }
}
export default connect(mapStateToProps, {
    addActiv, addPeriodS, addPeriodPo, addText
})(Statistic)