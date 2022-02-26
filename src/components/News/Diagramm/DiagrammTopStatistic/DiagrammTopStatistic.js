import React from 'react';
import { ResponsivePie } from '@nivo/pie'




const DiagrammTopStatistic = (props) => {


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


    const data = () => {

        if (props.selectDiagramm === 'USD') {
            return props.diagramm.map(a => {
                return {
                    'id': a.nameRus,
                    "label": a.nameRus,
                    "value": ((a.data.map(e => e.num).reduce((sum, current) => sum + current, 0) / props.dollar)).toFixed(0),
                    "color": a.color
                }
            })
        }
        else if (props.selectDiagramm === 'BYN') {
            return props.diagramm.map(a => {
                return {
                    'id': a.nameRus,
                    "label": a.nameRus,
                    "value": a.data.map(e => e.num).reduce((sum, current) => sum + current, 0),
                    "color": a.color
                }
            })
        }
        else if (props.selectDiagramm === 'EUR') {
            return props.diagramm.map(a => {
                return {
                    'id': a.nameRus,
                    "label": a.nameRus,
                    "value": ((a.data.map(e => e.num).reduce((sum, current) => sum + current, 0)) / props.euro).toFixed(0),
                    "color": a.color
                }
            })
        }
        return props.diagramm.map(a => {
            return {
                'id': a.nameRus,
                "label": a.nameRus,
                "value": ((a.data.map(e => e.num).reduce((sum, current) => sum + current, 0) / props.total) * 100).toFixed(1),
                "color": a.color
            }
        })
    }

    const color = props.diagramm.map(a => a.color)



    return (

        <ResponsivePie
            data={data()}
            margin={{
                top: 50, right: 70, bottom: 40, left: -265
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


export default DiagrammTopStatistic;







