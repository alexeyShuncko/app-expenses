import React from "react";
import { DataTransformation } from "../helpers/DataTransformation/DataTransformation";
import Message from "../helpers/Message/Message";
import s from './DiagrammContainer.module.css';
import DiagrammTopStatistic from "./DiagrammTopStatistic/DiagrammTopStatistic";
import { connect } from 'react-redux';
import { addDiagrammPo, addDiagrammS, addSelectDiagrammStat, addText } from './../../../Redux/diagrammReducer';
import DiagrammForm from './DiagrammForm/DiagrammForm';


const DiagrammContainer = (props) => {

    const diagramm = props.diagramm.category.map(a => {
        return {
            ...a,
            data: a.data.filter(
                a => a.time <= props.diagramm.diagramm.po && a.time >= props.diagramm.diagramm.s
            )
        }
    })

    const total = diagramm.map(a => a.data.map(e => e.num).reduce((sum, current) => sum + current, 0))
        .reduce((acc, num) => acc + num, 0)    // суммарный расход за выбранный период

    let dateS = DataTransformation(props.diagramm.diagramm.s)
    let datePo = DataTransformation(props.diagramm.diagramm.po)

    let textMessage =
        `Нет расходов с ${dateS} по ${datePo} ...`

    return ( <div>
            <DiagrammForm
                selectDiagrammStat={props.diagramm.selectDiagrammStat}
                addSelectDiagrammStat={props.addSelectDiagrammStat}
                addDiagrammS={props.addDiagrammS}
                addDiagrammPo={props.addDiagrammPo}
                periodS={props.diagramm.diagramm.s}
                periodPo={props.diagramm.diagramm.po}
                addText={props.addText}
            />
            <div className={s.diagramm}>
                {total === 0
                    ? <Message textMessage={textMessage} idMessage='messageDiagrammTotal' />
                    : <div className={s.pie}>
                        <DiagrammTopStatistic
                            total={total}
                            diagramm={diagramm}
                            selectDiagramm={props.diagramm.selectDiagrammStat}
                            dollar={props.diagramm.exchangeRates.dollar.Cur_OfficialRate}
                            euro={props.diagramm.exchangeRates.euro.Cur_OfficialRate}
                        />
                    </div>
                }
            </div>

        </div>)
}
let mapStateToProps = (state) => {
    return {
        diagramm: state.expenses
    }
}


export default connect(mapStateToProps, { addDiagrammS, addDiagrammPo, addSelectDiagrammStat, addText })
(DiagrammContainer)