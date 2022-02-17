import React from "react";
import { Field, Form } from "react-final-form";
import s from './Statistic.module.css';
import StatisticDate from './StatisticDate/StatisticDate';
import {
    addDiagramm, addSalary, addSelectDiagramm,
    addActiv, addPeriodSTime, addSalaryValueTrue, addPeriodS,
    addPeriodPo, addPeriodPoTime, addSelectDiagrammStat, addText
} from '../../../Redux/diagrammReducer';
import { connect } from 'react-redux';
import StatisticTable from "./StatisticDate/StatisticTable/StatisticTable";
import RelativityStatistic from './RelativityStatistic/RelativityStatistic';
import HedgehogFunc from './../helpers/HedgehodFunc/HedgehogFunc';
import ArrowValidate from "../Arrow/ArrowValidate";
import OffStyle from "../helpers/ArrowFunc/Offstyle";
import ArrowFunc from "../helpers/ArrowFunc/ArrowFunc";

const Statistic = (props) => {

    const time = new Date()
    function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return '20' + yy + '-' + mm + '-' + dd
    }
    const data = formatDate(time)


    const colorActiv = (e) => {
        if (e.target.value !== props.diagramm.activ) {
            props.addActiv(e.target.value)
            OffStyle(['inputCategoryStatistic'])
            //HedgehogFunc(props.addText, 'Категория выбрана ...')   на подумать, + изменение категории
        }
    }
    const periodS = (e) => {
        if (e.target.value !== props.diagramm.periodS && props.diagramm.periodS === '' ) {
            props.addPeriodS(e.target.value)
            HedgehogFunc(props.addText, 'Начало периода выбрано ...')
            ArrowFunc(null, null, 'buttonTable')

            // let disPeriodPo = document.getElementById('periodPo')    на подумать, отключить период 'По' 
            // disPeriodPo.disabled = false

            OffStyle(['periodS'])
        }
        else if (e.target.value !== props.diagramm.periodS) {
            props.addPeriodS(e.target.value)
            HedgehogFunc(props.addText, 'Начало периода изменено ...') 
            ArrowFunc(null, null, 'buttonTable')
            OffStyle(['periodS'])
        }
        
    }
    const periodPo = (e) => {

        if (e.target.value !== props.diagramm.periodPo && props.diagramm.periodPo === '') {
            props.addPeriodPo(e.target.value)
            HedgehogFunc(props.addText, 'Окончание периода выбрано ...')
            ArrowFunc(null, null, 'buttonTable')
            OffStyle(['periodPo']) 
        }
        else if (e.target.value !== props.diagramm.periodPo) {
            props.addPeriodPo(e.target.value)
            HedgehogFunc(props.addText, 'Окончание периода изменено ...') 
            ArrowFunc(null, null, 'buttonTable')
            OffStyle(['periodPo'])
        }
    }
    // const periodSTime = (e) => {
    //     if (e.target.value !== props.diagramm.periodSTime) {
    //         props.addPeriodSTime(e.target.value)
    //     }
    // }
    // const periodPoTime = (e) => {
    //     if (e.target.value !== props.diagramm.periodPoTime) {
    //         props.addPeriodPoTime(e.target.value)
    //     }
    // }

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
                                <div className={s.nameArrow}>
                                    <div>
                                        <div>
                                            <label className={s.categoryStatisticName} >Выберите категорию : </label>
                                        </div>

                                        <div className={s.nameArrow}>
                                            <Field
                                                autoFocus='on'
                                                id='inputCategoryStatistic'
                                                onClick={colorActiv}
                                                name="favorite"
                                                component="select"
                                                className={s.option}
                                                style={diagramm.map(a => a.nameRus).includes(props.diagramm.activ)
                                                    ? { backgroundColor: diagramm.filter(a => a.nameRus === props.diagramm.activ)[0].color }
                                                    : { backgroundColor: '#ffffff' }}
                                                    >
                                                <option>{props.diagramm.activ} </option>
                                                {diagramm.map(a =>
                                                    <option value={a.nameRus}
                                                        key={a.nameRus}
                                                        style={{ backgroundColor: ` ${a.color}` }}>
                                                        {a.nameRus}
                                                    </option>)}
                                            </Field>
                                        </div>
                                    </div>
                                    <div>
                                        <ArrowValidate arrowId='arrowCategory' />
                                    </div>

                                </div>


                                <div> {props.diagramm.activ
                                    ? <RelativityStatistic diagramm={props.diagramm} />
                                    : null}
                                </div>

                            </div>
                            <div className={s.period}>
                                <label className={s.categoryStatisticName}>Выберите период : </label>
                                <div className={s.nameArrow}>
                                    <div>
                                        <div className={s.periodStatistic}>
                                            <label>C: </label>
                                            <Field
                                            id='periodS'
                                                onChange={periodS}
                                                name="periodS"
                                                component="input"
                                                type="date"
                                                min='2022-02-01'
                                                max={props.diagramm.periodPo || data }>
                                            </Field>
                                            {/* <Field
                                                onChange={periodSTime}
                                                name="periodSTime"
                                                component="input"
                                                type="time">
                                            </Field> */}
                                        </div>
                                        <div className={s.periodStatistic}>
                                            <label>По: </label>
                                            <Field
                                            //disabled
                                            id='periodPo'
                                                onChange={periodPo}
                                                name="periodPo"
                                                component="input"
                                                type="date"
                                                min={props.diagramm.periodS || '2022-02-01'}
                                                max={data}>
                                            </Field>
                                            {/* <Field
                                                onChange={periodPoTime}
                                                name="periodPoTime"
                                                component="input"
                                                type="time"></Field> */}
                                        </div>
                                    </div>
                                    <div>
                                        <ArrowValidate arrowId='arrowPeriod' />
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                />

                <div><StatisticTable
                    addText={props.addText}
                    diagramm={props.diagramm} /></div>

            </div>
            <div className={s.statisticItem2}>
                <StatisticDate
                    addSelectDiagrammStat={props.addSelectDiagrammStat}
                    diagramm={props.diagramm}
                    addText={props.addText} />
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
    addSelectDiagrammStat, addText
})(Statistic)