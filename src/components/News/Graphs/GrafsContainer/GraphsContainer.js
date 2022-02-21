import React from 'react';
import s from './GraphsContainer.module.css';
import { ResponsiveLine } from '@nivo/line'
import { DataTransformation } from '../../helpers/DataTransformation/DataTransformation';
//import { ResponsiveBump } from '@nivo/bump'



const GraphsContainer = (props) => {


    let grafS = new Date(props.expenses.grafs.s)
    let grafPo = new Date(props.expenses.grafs.po)

      const qqqq =(a,b)=> {
        let arrTime = []
  for (let i = a; i < b; new Date(i.setDate(i.getDate() + 1))) {

    function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return '20' + yy + '-' + mm + '-' + dd
    }
    const data = formatDate(new Date(i))

     arrTime.push({time: DataTransformation(data)  })
      }
      return arrTime
}

     let timer = qqqq( grafS, grafPo)
    

    const data = props.expenses.category.map(a => {
        return {
            'id': a.nameRus,
            'data': timer.map(t => {
                return {
                    'x': t.time,
                    'y': a.data.filter(e => DataTransformation(e.time) === t.time).length !== 0
                        ? a.data[a.data.map(b => DataTransformation(b.time)).indexOf(t.time)].num
                        : 0
                }
            })
        }
    })

    const color = props.expenses.category.map(a => a.color)


    return (
        <div className={s.graff}>
            <ResponsiveLine
        data={data}
        margin={{ 
            top: props.expenses.category.length < 9 ? 50 : 30 , 
            right: 40, 
            bottom:props.expenses.category.length < 9 ? 180 : 330, 
            left: 80 }}
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
        areaOpacity={0.5}    // прозрачность цвета под графиком
        useMesh={true}
        theme={                 // объект добавления свойств диаграммы
            {    "fontSize": 13,
                // "background": "#ffffff",
                // "textColor": "#333333",
                 "axis": {               //оси
                     // "domain": { 
                    //      "line": {
                    //        "stroke": "#777777",
                    //         "strokeWidth": 1
                    // }
                     // },
                     "legend": {
                         "text": {
                            "fontSize": 18,
                             "fill": "#000"
                         }
                     },
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
                 },
                // "grid": {
                //     "line": {
                //         "stroke": "#dddddd",
                //         "strokeWidth": 1
                //     }
                // },
                  "legends": {
                //       "title": {
                //            "text": {
                //                "fontSize": 20,
                //                //"fill": "#333333"
                //           }
                //    },
                       "text": {
                           "fontSize": 16,
                       },
                    //   "ticks": {
                    //       "line": {},
                    //       "text": {
                    //           "fontSize": 10,
                    //           "fill": "#333333"
                    //   }
                    //   }
                 },
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
               
            //       "tooltip": {        // настройка подсказок всплывающих
            //           "container": {
            //               "background": "#ffffff",
            //               "color": "#333333",
            //               "fontSize": 16
            //           },
            //           "basic": {},
            //           "chip": {},
            //           "table": {},
            //           "tableCell": {},
            //           "tableCellValue": {}
            //       }
              }
        }
        // onMouseEnter={(data, e) => {
        //     console.log({ is: 'mouseenter', data, event: e }) 
        // }}
        // onMouseLeave={(data, e) => {
        //     console.log({ is: 'mouseleave', data, event: e }) 
        // }}
        // onClick={(data, e) => {
        //     console.log({ is: 'onclick', data, event: e }) 
        // }}
        // sliceTooltip={({ slice }) => {    // кастомная всплывающая подсказка по всем категориям
        //     return (
        //         <div
        //             style={{
        //                 background: 'white',
        //                 padding: '9px 12px',
        //                 border: '1px solid #ccc',
        //             }}
        //         >
        //             <div>{slice.points.serieId}</div>
        //             {slice.points.map(point => (
        //                 <div
        //                     key={point.id}
        //                     style={{
        //                         color: point.serieColor,
        //                         padding: '3px 0',
        //                     }}
        //                 >
        //                     <strong>{point.serieId}</strong> {point.data.yFormatted}
        //                 </div>
        //             ))}
                   
        //         </div>
        //     )
        // }}
        legends={[
            {
                anchor: props.expenses.category.length < 9 ? 'top' : 'bottom-left',
                direction: props.expenses.category.length < 9 ?'row' : 'column',
                justify: false,
                translateX: 0,
                translateY: props.expenses.category.length < 9 ? -40: 300,
                itemWidth: 110,
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
            {/* <ResponsiveBump
                data={data}
                xOuterPadding={0.25}
                colors={color}
                activeLineWidth={6}
                inactiveLineWidth={2}
                inactiveOpacity={0.15}
                startLabelTextColor={{ from: 'color', modifiers: [] }}
                endLabelPadding={17}
                endLabelTextColor={{ from: 'color', modifiers: [] }}
                pointSize={7}
                activePointSize={14}
                inactivePointSize={7}
                pointColor='#ffffff'
                pointBorderWidth={3}
                activePointBorderWidth={3}
                pointBorderColor={{ from: 'serie.color' }}
                axisTop={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 0,
                    tickRotation: -90,
                    legend: 'Дата',
                    legendPosition: 'middle',
                    legendOffset: 70
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Сумма потраченных денег',
                    legendPosition: 'middle',
                    legendOffset: -46
                }}
                margin={{ top: 40, right: 100, bottom: 80, left: 60 }}
                axisRight={null}
            /> */}
        </div>
    )

}



export default GraphsContainer

