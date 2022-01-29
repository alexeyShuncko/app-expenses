import React from "react";
import { Field, Form } from "react-final-form";
import s from './Statistic.module.css';
import StatisticDate from './StatisticDate/StatisticDate';
import {
    addDiagramm, addSalary, addSelectDiagramm,
    addActiv, addPeriodSTime, addSalaryValueTrue, addPeriodS,
    addPeriodPo, addPeriodPoTime, addSelectDiagrammStat
} from '../../../Redux/diagrammReducer';
import { connect } from 'react-redux';
import StatisticTable from "./StatisticDate/StatisticTable/StatisticTable";
import RelativityStatistic from './RelativityStatistic/RelativityStatistic';

const Statistic = (props) => {

    const colorActiv = (e) => {
        if (e.target.value !== props.diagramm.activ) {
            props.addActiv(e.target.value)
        }
    }
    const periodS = (e) => {
        if (e.target.value !== props.diagramm.periodS) {
            props.addPeriodS(e.target.value)
        }
    }
    const periodPo = (e) => {
        if (e.target.value !== props.diagramm.periodPo) {
            props.addPeriodPo(e.target.value)
        }
    }
    const periodSTime = (e) => {
        if (e.target.value !== props.diagramm.periodSTime) {
            props.addPeriodSTime(e.target.value)
        }
    }
    const periodPoTime = (e) => {
        if (e.target.value !== props.diagramm.periodPoTime) {
            props.addPeriodPoTime(e.target.value)
        }
    }

    const diagramm = props.diagramm.category

    const onSubmit = (values) => { }

    return (
        <div className={s.statistic}>
            <div className={s.statisticItem1}>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{
                        ...props.diagramm
                    }}

                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} >

                            <div className={s.categoryStatistic}>
                                <label className={s.categoryStatisticName} >Выберите категорию : </label>

                                <Field onClick={colorActiv} name="favorite"
                                    component="select" className={s.option}
                                    style={diagramm.map(a => a.nameRus).includes(props.diagramm.activ)
                                        ? { backgroundColor: diagramm.filter(a => a.nameRus === props.diagramm.activ)[0].color }
                                        : { backgroundColor: 'ffffff' }}>
                                    <option>{props.diagramm.activ} </option>
                                    {diagramm.map(a => <option value={a.nameRus} key={a.nameRus}
                                        style={{ backgroundColor: ` ${a.color}` }}>{a.nameRus}</option>)}
                                </Field>

                                <div> {props.diagramm.activ 
                                ? <RelativityStatistic diagramm={props.diagramm}/>
                                : null} 
                                </div>

                            </div>
                            <div className={s.period}>
                                <label className={s.categoryStatisticName}>Выберите период : </label>
                                <div className={s.periodStatistic}>
                                    <label>C: </label>
                                    <Field onChange={periodS} name="periodS" component="input" type="date"></Field>
                                    <Field onChange={periodSTime} name="periodSTime" component="input" type="time"></Field>
                                </div>
                                <div className={s.periodStatistic}>
                                    <label>По: </label>
                                    <Field onChange={periodPo} name="periodPo" component="input" type="date"></Field>
                                    <Field onChange={periodPoTime} name="periodPoTime" component="input" type="time"></Field>
                                </div>

                            </div>
                        </form>
                    )}
                />

                <div><StatisticTable diagramm={props.diagramm} /></div>

            </div>
            <div className={s.statisticItem2}>
                <StatisticDate
                    addSelectDiagrammStat={props.addSelectDiagrammStat}
                    diagramm={props.diagramm} />
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
    addDiagramm, addActiv, addSalary,
    addPeriodS, addPeriodPo, addPeriodSTime,
    addPeriodPoTime, addSelectDiagramm, addSalaryValueTrue,
    addSelectDiagrammStat
})(Statistic)