import React from "react";
import s from './Statistic.module.css';
import TotalTable from './TotalTable/TotalTable';
import {
    addActiv, addPeriod, addText, addTableSelect, addActivHedgehog, deleteAppRecording, 
    tableValuta, tableTotalValuta } from '../../Redux/diagrammReducer';
import { connect } from 'react-redux';
import StatisticTable from "./StatisticTable/StatisticTable";
import StatisticPeriod from "./StatisticPeriod/StatisticPeriod";



const Statistic = (props) => {

   

    return (
        <div className={s.statistic}>

            <div className={s.period}>
                <StatisticPeriod
                    diagramm={props.diagramm}
                    tablePeriod={props.diagramm.period[0]}
                    addActiv={props.addActiv}
                    addPeriod={props.addPeriod}
                    addText={props.addText}
                    addActivHedgehog={props.addActivHedgehog} />
            </div>

            <div className={s.tables}>
                <div className={s.tableCategory}>
                    <StatisticTable
                  
                    tableValuta={props.tableValuta}
                        addText={props.addText}
                        diagramm={props.diagramm}
                        addActivHedgehog={props.addActivHedgehog} />
                </div>
                <div className={s.tableDate}>
                    <TotalTable
                      tableTotalValuta={props.tableTotalValuta}
                    deleteAppRecording={props.deleteAppRecording}
                        addTableSelect={props.addTableSelect}
                        diagramm={props.diagramm}
                        addText={props.addText}
                        //на случай взаимодействия с ежом
                        addActivHedgehog={props.addActivHedgehog} /> 
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
    addActiv, addPeriod, addText, addTableSelect, addActivHedgehog, deleteAppRecording, tableValuta, tableTotalValuta
})(Statistic)