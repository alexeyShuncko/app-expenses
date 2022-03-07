import React from 'react';
import s from './GrafsIncome.module.css';
import { ResponsiveLine } from '@nivo/line'
import { DataTransformation } from '../../helpers/DataTransformation/DataTransformation';
import { DateFunc } from '../../helpers/DateFunc/DateFunc';
import { MonthFunc } from '../../helpers/DataTransformation/MonthFunc';




const GrafsIncome = (props) => {


    let coefficientFunc = () => {
        if (props.grafSelectValuta === "BYN") {
            return 1
        }
        else if (props.grafSelectValuta === "USD") {
            return props.dollar
        }
        else if (props.grafSelectValuta === "EUR") {
            return props.euro
        }
    }

    let coefficient = coefficientFunc()


    let grafS = new Date(props.periodS)
    let grafPo = new Date(props.periodPo)



    const arrDates = (a, b) => {

        if ((b.getTime() - a.getTime()) > 2592000000) {

            let arrTime = []
            for (let i = a; i < b; new Date(i.setMonth(i.getMonth() + 1))) {

                const data = DateFunc(new Date(i))

                arrTime.push({ time: MonthFunc(data) })
            }
            return arrTime
        }
        else if ((b.getTime() - a.getTime()) < 2592000000) {
            let arrTime = []
            for (let i = a; i < b; new Date(i.setDate(i.getDate() + 1))) {

                const data = DateFunc(new Date(i))

                arrTime.push({ time: DataTransformation(data) })
            }
            return arrTime
        }
        
    }
   
    let timer = arrDates(grafS, grafPo)
    console.log(timer.length)

    const data = props.income.data.map(a => {
        return {
            'id': a.name,
            'data': timer.map(t => {
                return {
                    'x': t.time,
                    'y': a.data.filter(e => DataTransformation(e.time) === t.time).length !== 0
                        ? Math.round(a.data
                            .filter(e => DataTransformation(e.time) === t.time)
                            .map(m => m.num)
                            .reduce((acc, num) => acc + num, 0) / coefficient)
                        : 0
                }
            })
        }
    })

    // const color = props.category.map(a => a.color)


    return (
        <div className={s.graff}>
            <ResponsiveLine
                data={data}
                margin={{
                    top: 50,
                    right: 40,
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
                    legend: 'Заработанная сумма денег',
                    legendOffset: -55,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: 'category10' }}
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
                areaOpacity={0.7}    // прозрачность цвета под графиком
                useMesh={true}
                theme={                 // объект добавления свойств диаграммы
                    {
                        "fontSize": 13,
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
                        anchor: 'top',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: -40,
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
        </div>
    )

}



export default GrafsIncome

