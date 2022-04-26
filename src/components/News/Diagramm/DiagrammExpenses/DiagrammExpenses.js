import React from 'react';
import { ResponsivePie } from '@nivo/pie'
import { DataTransformation } from '../../helpers/DataTransformation/DataTransformation';
import Message from '../../helpers/Message/Message';



const DiagrammExpenses = (props) => {


// объект расходов за выбранный период
    const diagramm = props.diagramm.map(a => {
        return {
            ...a,
            data: a.data.filter(
                a => a.created <= (props.periodDiagramm.Po || props.todayPo) 
                && a.created >= (props.periodDiagramm.S || props.todayS)
            )
        }
    })

// суммарный расход за выбранный период
    const totalDiag = diagramm.map(a => a.data.map(e => e.amount).reduce((sum, current) => sum + current, 0))
        .reduce((acc, num) => acc + num, 0)    


    let dateS = DataTransformation(props.periodDiagramm.S || props.todayS)
    let datePo = DataTransformation(props.periodDiagramm.Po || props.todayPo)

    let textMessage =
        `Нет расходов с ${dateS} по ${datePo} ...`

// Слой в центре диаграммы
    const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {

        let total = 0
        dataWithArc.forEach(datum => {
            total += Number(datum.value)
        })
        return (
            <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: String(total).length <= 3 ? '62px' : '54px',
                    fontWeight: 600,
                }}
            >
                {Math.round(total)}
            </text>
        )
    }

// Данные для диаграмы в зависимости от выбора валюты
    const data = () => {

        if (props.selectDiagramm === 'USD') {
            return diagramm.map(a => {
                return {
                    'id': a.name,
                    "label": a.name,
                    "value": ((a.data.map(e => e.amount).reduce((sum, current) => sum + current, 0) / props.dollar)).toFixed(0),
                    "color": a.color
                }
            })
        }
        else if (props.selectDiagramm === 'BYN') {
            return diagramm.map(a => {
                return {
                    'id': a.name,
                    "label": a.name,
                    "value": a.data.map(e => e.amount).reduce((sum, current) => sum + current, 0),
                    "color": a.color
                }
            })
        }
        else if (props.selectDiagramm === 'EUR') {
            return diagramm.map(a => {
                return {
                    'id': a.name,
                    "label": a.name,
                    "value": ((a.data.map(e => e.amount).reduce((sum, current) => sum + current, 0)) / props.euro).toFixed(0),
                    "color": a.color
                }
            })
        }
        return diagramm.map(a => {
            return {
                'id': a.name,
                "label": a.name,
                "value": ((a.data.map(e => e.amount).reduce((sum, current) => sum + current, 0) / totalDiag) * 100).toFixed(1),
                "color": a.color
            }
        })
    }

    const color = props.diagramm.map(a => a.color)

    return (
        totalDiag === 0
            ? <Message textMessage={textMessage} idMessage='messageDiagrammTotal' />
            : <ResponsivePie
                data={data()}
                margin={{
                    top: 50, right: 70, bottom: 50, left: -265
                }}
                theme={                 // объект добавления свойств диаграммы
                    {
                        "fontSize": 16,
                        "legends": {
                            "text": {
                                "fontSize": 20,
                                "fill": "#ffffff"
                            }
                        }
                    }
                }
                // tooltip={({ datum: { id, value, color } }) => ( // настройка подсказок всплывающих + в объекте theme
                //     <div
                //         style={{
                //             padding: 12,
                //             color,
                //             background: '#222222',
                //         }}
                //     >
                //         <strong>
                //             {id}: {value}
                //         </strong>
                //     </div>
                // )}
                //sortByValue={true}  //упорядочивание по значению по умолчанию false
                innerRadius={0.65}  // внутренний радиус
                padAngle={2}        // расстояние между частями диаграммы в градусах
                cornerRadius={8}    // радиус скругления краёв частей диаграммы
                activeInnerRadiusOffset={25}  // увеличение внутреннего радиуса при наведении
                activeOuterRadiusOffset={20} // увеличение внешнего радиуса при наведении
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
                colors={color}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.2
                        ]
                    ]
                }}
                arcLinkLabelsSkipAngle={16}         // угол при котором не отображается линия выноска
                arcLinkLabelsTextColor="#fff"
                arcLinkLabelsTextOffset={4}          // расстояние от текста долинии выноски
                arcLinkLabelsOffset={2}             // длина наклонной линии выноски
                arcLinkLabelsStraightLength={12}     // длина прямой линии выноски
                arcLinkLabelsThickness={2}           // толщина линии выноски
                arcLinkLabelsColor={{ from: 'color' }}
                //     arcLabel={function(e){ if (props.selectDiagramm === 'USD') {  // вид подписей диаграмм, по умолчанию value
                //                     return e.value+"$"
                //                 }
                //         else if (props.selectDiagramm === 'BYN') {
                //             return e.value+"р."
                //         }
                //         else if (props.selectDiagramm === 'EUR') {
                //             return e.value+"€"
                //         }
                //         else if (props.selectDiagramm === '%') {
                //             return e.value+"%"
                //         }
                //     }
                // }
                arcLabelsSkipAngle={12}             //угол при котором не отображаются значения диаграммы
                arcLabelsTextColor="black" // цвет значений диаграммы
                legends={[
                    {
                        anchor: 'top-right',
                        direction: 'column',
                        justify: false,
                        translateX: -150,
                        translateY: 0,
                        itemsSpacing: 5,
                        itemWidth: 130,
                        itemHeight: 25,
                        itemTextColor: '#ffffff',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 21,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
    )

}


export default DiagrammExpenses;







