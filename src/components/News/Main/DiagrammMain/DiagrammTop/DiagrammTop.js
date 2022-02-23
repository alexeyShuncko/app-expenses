import React from 'react';
import { ResponsivePie } from '@nivo/pie'


const CenteredMetric = ({ dataWithArc, centerX, centerY, props }) => {
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
                fontSize: '52px',
                fontWeight: 600,
            }}
        >
            {Math.round(total)}
        </text>
    )
}    

const DiagrammTop = (props) => {
    
    let totalSumm = props.diagramm.category.map(a =>a && a.summ).reduce((acc, num) => acc + num, 0)

   const  data =()=> {

    if (props.selectDiagramm === 'USD') {
        return props.diagramm.category.map(a=> { return { 
            'id': a.nameRus,  
        "label": a.nameRus,
        "value": Math.round(a.summ / props.dollar),
        "color": a.color}})
    }
    else if (props.selectDiagramm === 'BYN') {
        return props.diagramm.category.map(a=> { return { 
            'id': a.nameRus,  
        "label": a.nameRus,
        "value": a.summ,
        "color": a.color}})
    }
    else if (props.selectDiagramm === 'EUR') {
        return props.diagramm.category.map(a=> { return { 
            'id': a.nameRus,  
        "label": a.nameRus,
        "value": Math.round(a.summ / props.euro),
        "color": a.color}})
    }
    return props.diagramm.category.map(a=> { return { 
        'id': a.nameRus,  
    "label": a.nameRus,
    "value": ((a.summ/totalSumm)*100).toFixed(0),
    "color": a.color}})
         }

   const color = props.diagramm.category.map(a=> a.color)


   
return (
   
<ResponsivePie
        data={data()}
        margin={{ 
            top: props.diagramm.category.length <= 5 ? 40 : 70, 
            right: props.diagramm.category.length <= 5 ? 40 : 70, 
            bottom: props.diagramm.category.length <= 5 ? 70 : 40, 
            left: props.diagramm.category.length <= 5 ? 30 : -40 }}
        
        theme={                 // объект добавления свойств диаграммы
            {    "fontSize": 16,
                // "background": "#ffffff",
                // "textColor": "#333333",
                // "axis": {               //оси
                    //  "domain": { 
                    //      "line": {
                    //        "stroke": "#777777",
                    //         "strokeWidth": 1
                    // }
                     // },
                     //"legend": {
                      //   "text": {
                      //       "fontSize": 16,
                            // "fill": "#333333"
                        // }
                    // },
                    //  "ticks": {
                    //      "line": {
                    //          "stroke": "#777777",
                    //          "strokeWidth": 1
                    //      },
                    //      "text": {
                    //          "fontSize": 11,
                    //          "fill": "#333333"
                    //      }
                    //  }
                // },
                // "grid": {
                //     "line": {
                //         "stroke": "#dddddd",
                //         "strokeWidth": 1
                //     }
                // },
                //  "legends": {
                    //  "title": {
                    //      "text": {
                    //          "fontSize": 11,
                    //          "fill": "#333333"
                    //      }
                    //  },
                    //  "text": {
                    //      "fontSize": 16,
                    //      "fill": "#333333"
                    //  },
                    //  "ticks": {
                    //      "line": {},
                    //      "text": {
                    //          "fontSize": 10,
                    //          "fill": "#333333"
                    //  }
                    //  }
                // },
                //  "annotations": {
                //      "text": {
                //          "fontSize": 25,
                //          "fill": "#333333",
                //          "outlineWidth": 2,
                //          "outlineColor": "#ffffff",
                //          "outlineOpacity": 1
                //      },
                //      "link": {
                //          "stroke": "#000000",
                //          "strokeWidth": 1,
                //          "outlineWidth": 2,
                //          "outlineColor": "#ffffff",
                //          "outlineOpacity": 1
                //      },
                //      "outline": {
                //          "stroke": "#000000",
                //          "strokeWidth": 2,
                //          "outlineWidth": 2,
                //          "outlineColor": "#ffffff",
                //          "outlineOpacity": 1
                //      },
                //  "symbol": {
                //          "fill": "#000000",
                //          "outlineWidth": 2,
                //          "outlineColor": "#ffffff",
                //          "outlineOpacity": 1
                //      }
                //  },
               
            //      "tooltip": {        // настройка подсказок всплывающих
            //          "container": {
            //              "background": "#ffffff",
            //              "color": "#333333",
            //              "fontSize": 16
            //          },
            //          "basic": {},
            //          "chip": {},
            //          "table": {},
            //          "tableCell": {},
            //          "tableCellValue": {}
            //      }
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
        //sortByValue={true}  упорядочивание по значению по умолчанию false
        innerRadius={0.65}  // внутренний радиус
        padAngle={2}        // расстояние между частями диаграммы в градусах
        cornerRadius={8}    // радиус скругления краёв частей диаграммы
        activeInnerRadiusOffset={26}  // увеличение внутреннего радиуса при наведении
        activeOuterRadiusOffset={10} // увеличение внешнего радиуса при наведении
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
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#fff"
        arcLinkLabelsOffset={-4}
        arcLinkLabelsStraightLength={21}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabel={function(e){ if (props.selectDiagramm === 'USD') {  // вид подписей диаграмм, по умолчанию value
                        return e.value+"$"
                    }
            else if (props.selectDiagramm === 'BYN') {
                return e.value+"р."
            }
            else if (props.selectDiagramm === 'EUR') {
                return e.value+"€"
            }
            else if (props.selectDiagramm === '%') {
                return e.value+"%"
            }
        }
    }
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="black" // цвет значений диаграммы
        
        // arcLabelsTextColor={{
        //     from: 'color',
        //     modifiers: [
        //         [
        //             'darker',
        //             2
        //         ]
        //     ]
        // }}
        // defs={[
        //     {
        //         id: 'dots',
        //         type: 'patternDots',
        //         background: 'inherit',
        //         color: 'rgba(255, 255, 255, 0.3)',
        //         size: 4,
        //         padding: 1,
        //         stagger: true
        //     },
        //     {
        //         id: 'lines',
        //         type: 'patternLines',
        //         background: 'inherit',
        //         color: 'rgba(255, 255, 255, 0.3)',
        //         rotation: -45,
        //         lineWidth: 6,
        //         spacing: 10
        //     }
        // ]}
        // fill={[
        //     {
        //         match: {
        //             id: 'ruby'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'c'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'go'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'python'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'scala'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'lisp'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'elixir'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'javascript'
        //         },
        //         id: 'lines'
        //     }
        // ]}
        legends={[
            {
                anchor: props.diagramm.category.length <= 5 ? 'bottom' : 'top-right',
                direction: props.diagramm.category.length <= 5 ? 'row' : 'column',
                justify: false,
                translateX: props.diagramm.category.length <= 5 ? 0 : 30,
                translateY: props.diagramm.category.length <= 5 ? 60 : -40,
                itemsSpacing: props.diagramm.category.length <= 5 ? 0 : 5,
                itemWidth: 130,
                itemHeight: 20,
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


export default DiagrammTop;



