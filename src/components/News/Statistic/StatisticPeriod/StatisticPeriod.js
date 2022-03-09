import React from "react";
import s from './StatisticPeriod.module.css';
import RelativityStatistic from './RelativityStatistic/RelativityStatistic';
import HedgehogFunc from '../../helpers/HedgehodFunc/HedgehogFunc';
import ArrowValidate from "../../Arrow/ArrowValidate";
import OffStyle from "../../helpers/ArrowFunc/Offstyle";
import ArrowFunc from "../../helpers/ArrowFunc/ArrowFunc";


const StatisticPeriod = (props) => {

  

    const colorActiv = (e) => {
        if (e.target.value !== props.diagramm.activ.name) {
            props.addActiv(e.target.value)
            OffStyle(['inputCategoryStatistic'])
            //HedgehogFunc(props.addText, 'Категория выбрана ...')   на подумать, + изменение категории
        }
    }
    const periodS = (e) => {
        if (e.target.value !== props.diagramm.periodS && props.diagramm.periodS === '') {
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

    const diagramm = props.diagramm.category


    return (

        <div className={s.categoryStatistic}>
            <div className={s.category}>
                <div className={s.nameArrow}>
                    <div>
                        <div className={s.categoryStatisticName}>
                            Выберите категорию :
                        </div>

                        <select
                            autoFocus='on'
                            id='inputCategoryStatistic'
                            onClick={colorActiv}
                            className={s.option}
                            style={diagramm.map(a => a.idCategory).includes(props.diagramm.activ.id)
                                ? { backgroundColor: diagramm.filter(a => a.idCategory === props.diagramm.activ.id)[0].color }
                                : { backgroundColor: '#ffffff' }}
                        >
                            <option>{props.diagramm.activ.id && diagramm.filter(a => a.idCategory === props.diagramm.activ.id)[0].nameRus} </option>
                            {diagramm.map(a =>
                                <option value={a.nameRus}
                                    key={a.nameRus}
                                    style={{ backgroundColor: ` ${a.color}` }}>
                                    {a.nameRus}
                                </option>)}
                        </select>

                    </div>
                    <div>
                        <ArrowValidate arrowId='arrowCategory' />
                    </div>
                </div>

                <div> {props.diagramm.activ.name
                    ? <RelativityStatistic diagramm={props.diagramm} />
                    : null}
                </div>
            </div>
            <div className={s.period}>
                <div className={s.categoryStatisticName}>Выберите период : </div>
                <div className={s.nameArrow}>
                    <div>
                        <div className={s.periodStatistic}>
                            <div className={s.periodDate}>C:</div>
                            <input
                                id='periodS'
                                onChange={periodS}
                                type="date"
                                min='2021-01-01'
                                max={props.diagramm.periodPo || props.diagramm.today.po}
                                defaultValue={props.diagramm.today.s}>
                            </input>
                        </div>
                        <div className={s.periodStatistic}>
                            <div className={s.periodDate}>По:</div>
                            <input
                                //disabled
                                id='periodPo'
                                onChange={periodPo}
                                type="date"
                                min={props.diagramm.periodS}
                                max={props.diagramm.today.po}
                                defaultValue={props.diagramm.today.po}>
                            </input>
                        </div>
                    </div>
                    <div>
                        <ArrowValidate arrowId='arrowPeriod' />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default StatisticPeriod