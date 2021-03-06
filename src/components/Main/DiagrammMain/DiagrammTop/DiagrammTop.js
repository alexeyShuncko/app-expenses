import React from 'react';
import { ResponsivePie } from '@nivo/pie'


  

const DiagrammTop = (props) => {

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
                    fontSize: String(total).length <= 3 ? '52px' : '44px',
                    fontWeight: 600,
                }}
            >
                {Math.round(total)}
            </text>
        )
    }  
    
    let totalSumm = props.diagramm.category
    .map(a => a.data
        .map(b => b.amount)
        .reduce((acc, num) => acc + num, 0))
    .reduce((acc, num) => acc + num, 0)
    
   const  data =()=> {

    if (props.selectDiagramm === 'USD') {
        return props.diagramm.category.map(a=> { return { 
            'id': a.name,  
        "label": a.name,
        "value": Math.round(a.data.map(b => b.amount).reduce((acc, num) => acc + num, 0) / props.dollar),
        "color": a.color}})
    }
    else if (props.selectDiagramm === 'BYN') {
        return props.diagramm.category.map(a=> { return { 
            'id': a.name,  
        "label": a.name,
        "value": Math.round(a.data.map(b => b.amount).reduce((acc, num) => acc + num, 0)),
        "color": a.color}})
    }
    else if (props.selectDiagramm === 'EUR') {
        return props.diagramm.category.map(a=> { return { 
            'id': a.name,  
        "label": a.name,
        "value": Math.round(a.data.map(b => b.amount).reduce((acc, num) => acc + num, 0) / props.euro),
        "color": a.color}})
    }
    return props.diagramm.category.map(a=> { return { 
        'id': a.name,  
    "label": a.name,
    "value": ((a.data.map(b => b.amount).reduce((acc, num) => acc + num, 0)/totalSumm)*100).toFixed(1),
    "color": a.color}})
         }

   const color = props.diagramm.category.map(a=> a.color)


   
return (
   
<ResponsivePie
        data={data()}
        margin={{ 
            top: 70, 
            right: 70, 
            bottom: 40, 
            left: -80 }}
        
        theme={                 // ???????????? ???????????????????? ?????????????? ??????????????????
            {    "fontSize": 16,
                // "background": "#ffffff",
                // "textColor": "#333333",
                // "axis": {               //??????
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
               
            //      "tooltip": {        // ?????????????????? ?????????????????? ??????????????????????
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
        // tooltip={({ datum: { id, value, color } }) => ( // ?????????????????? ?????????????????? ?????????????????????? + ?? ?????????????? theme
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
        //sortByValue={true}  //???????????????????????????? ???? ???????????????? ???? ?????????????????? false
        innerRadius={0.65}  // ???????????????????? ????????????
        padAngle={2}        // ???????????????????? ?????????? ?????????????? ?????????????????? ?? ????????????????
        cornerRadius={8}    // ???????????? ???????????????????? ?????????? ???????????? ??????????????????
        activeInnerRadiusOffset={25}  // ???????????????????? ?????????????????????? ?????????????? ?????? ??????????????????
        activeOuterRadiusOffset={20} // ???????????????????? ???????????????? ?????????????? ?????? ??????????????????
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
        arcLinkLabelsSkipAngle={16}         // ???????? ?????? ?????????????? ???? ???????????????????????? ?????????? ??????????????
        arcLinkLabelsTextColor="#fff"
        arcLinkLabelsTextOffset={4}          // ???????????????????? ???? ???????????? ?????????????? ??????????????
        arcLinkLabelsOffset={2}             // ?????????? ?????????????????? ?????????? ??????????????
        arcLinkLabelsStraightLength={12}     // ?????????? ???????????? ?????????? ??????????????
        arcLinkLabelsThickness={2}           // ?????????????? ?????????? ??????????????
        arcLinkLabelsColor={{ from: 'color' }}
    //     arcLabel={function(e){ if (props.selectDiagramm === 'USD') {  // ?????? ???????????????? ????????????????, ???? ?????????????????? value
    //                     return e.value+"$"
    //                 }
    //         else if (props.selectDiagramm === 'BYN') {
    //             return e.value+"??."
    //         }
    //         else if (props.selectDiagramm === 'EUR') {
    //             return e.value+"???"
    //         }
    //         else if (props.selectDiagramm === '%') {
    //             return e.value+"%"
    //         }
    //     }
    // }
        arcLabelsSkipAngle={12}             //???????? ?????? ?????????????? ???? ???????????????????????? ???????????????? ??????????????????
        arcLabelsTextColor="black" // ???????? ???????????????? ??????????????????
        
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
                anchor:  'top-right',
                direction:  'column',
                justify: false,
                translateX:  40,
                translateY:  -40,
                itemsSpacing:  5,
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



