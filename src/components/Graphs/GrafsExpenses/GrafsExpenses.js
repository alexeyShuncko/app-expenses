import React from 'react';
import s from './GrafsExpenses.module.css';
import { ResponsiveLine } from '@nivo/line'
import { DataTransformation } from '../../helpers/DataTransformation/DataTransformation';
import { DateFunc } from '../../helpers/DateFunc/DateFunc';
import { MonthFunc } from '../../helpers/DataTransformation/MonthFunc';
import Message from '../../helpers/Message/Message';
import { coefficientFunc } from '../../helpers/CoefficientFunc';



const GrafsExpenses = (props) => {


    let coefficient = coefficientFunc(props.grafSelectValuta, props.dollar, props.euro, props.ruble)


    let grafS = new Date(props.periodGraf.S || props.todayS)
    let grafPo = new Date(props.periodGraf.Po || props.todayPo)

    const arrDates = (a, b) => {

        if ((b.getTime() - a.getTime()) > 2678400000) {

            let arrTime = []
            for (let i = a; i <= b; new Date(i.setMonth(i.getMonth() + 1, [1]))) {

                const data = DateFunc(new Date(i))

                arrTime.push({ created: MonthFunc(data) })
            }
            return arrTime
        }

        let arrTime = []
        for (let i = a; i <= b; new Date(i.setDate(i.getDate() + 1))) {

            const data = DateFunc(new Date(i))

            arrTime.push({ created: DataTransformation(data) })
        }
        return arrTime
    }

    let timer = arrDates(grafS, grafPo)


    const data = props.category.map(a => {
        return {
            'id': a.name,
            'data': timer.map(t => {
                return {
                    'x': t.created,
                    'y': a.data.filter(e => timer[0].created.length > 8
                        ? DataTransformation(e.created) === t.created
                        : MonthFunc(e.created) === t.created).length !== 0
                        ? Math.round(a.data
                            .filter(e => timer[0].created.length > 8
                                ? DataTransformation(e.created) === t.created
                                : MonthFunc(e.created) === t.created)
                            .map(m => m.amount)
                            .reduce((acc, num) => acc + num, 0) / coefficient)
                        : 0
                }
            })
        }
    })
    let valid = data.map(a => a.data
        .map(b => b.y)
        .reduce((acc, num) => acc + num, 0)
    ).reduce((acc, num) => acc + num, 0)

    const color = props.category.map(a => a.color)

    let textMessage =
        `У Вас нет расходов ...`

    return (
        <div className={s.graff}>
            {valid === 0
                ? <Message textMessage={textMessage} idMessage='messageGrafExpenses' />
                : <ResponsiveLine
                    data={data}
                    margin={{
                        top: props.category.length < 7 ? 50 : 5,
                        right: props.category.length < 7 ? 40 : 160,
                        bottom: 120,
                        left: 80
                    }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false
                    }}
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 3,
                        tickPadding: 4,
                        tickRotation: -90,
                        legend: 'Дата',
                        legendOffset: 100,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Потраченная сумма денег',
                        legendOffset: -65,
                        legendPosition: 'middle'
                    }}
                    colors={color}
                    pointSize={5}
                    pointColor="black"
                    pointBorderWidth={3}
                    pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                    pointLabelYOffset={-18}
                    enableCrosshair={true}  // перекрестие на точку поумолчанию true
                    crosshairType="cross"
                    enableArea={true}
                    enableSlices="x" // отображаются данны по всем категориям
                    areaBlendMode="darken" // цвет под графиком
                    areaOpacity={0.6}    // прозрачность цвета под графиком
                    useMesh={true}
                    theme={                 // объект добавления свойств диаграммы
                        {
                            "fontSize": 13,
                            // "background": "#ffffff",
                            // "textColor": "#333333",
                            "axis": {               //оси
                                "legend": {
                                    "text": {
                                        "fontSize": 18,
                                        "fill": "#000"
                                    }
                                },
                            },
                          
                            "legends": {
                                "text": {
                                    "fontSize": 16,
                                },
                            },
                        }
                    }
                   
                    legends={[
                        {
                            anchor: props.category.length < 7 ? 'top' : 'right',
                            direction: props.category.length < 7 ? 'row' : 'column',
                            justify: false,
                            translateX: props.category.length < 7 ? 0 : 160,
                            translateY: props.category.length < 7 ? -40 : 0,
                            itemWidth: 150,
                            itemHeight: 20,
                            itemsSpacing: 4,
                            symbolSize: 20,
                            symbolShape: 'circle',
                            itemDirection: 'left-to-right',
                            itemTextColor: '#000',

                            effects: [
                                {
                                    on: 'hover',

                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]
                    }
                />

            }

        </div>
    )

}



export default GrafsExpenses

