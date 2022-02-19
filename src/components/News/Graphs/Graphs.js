import React from 'react';
import s from './Graphs.module.css';


import { ResponsiveLine } from '@nivo/line'
import { connect } from 'react-redux';
import { DataTransformation } from '../helpers/DataTransformation/DataTransformation';
import { ResponsiveBump } from '@nivo/bump'



const Grafs = (props) => {


    const timer = [
        { time: '01.02.2022'},
        { time: '02.02.2022'},
        { time: '03.02.2022'},
        { time: '04.02.2022'},
         {time: '05.02.2022'},
        {time: '06.02.2022'},
         {time: '07.02.2022'},
         {time: '08.02.2022'},
         {time: '09.02.2022'},
         {time: '10.02.2022'},
         {time: '11.02.2022'},
         {time: '12.02.2022'},
         {time: '13.02.2022'},
         {time: '14.02.2022'},
         {time: '15.02.2022'},
         {time: '16.02.2022'},
         {time: '17.02.2022'},
         {time: '18.02.2022'},
         {time: '19.02.2022'},
         {time: '20.02.2022'},
         {time: '21.02.2022'},
         {time: '22.02.2022'},
         {time: '23.02.2022'},
         {time: '24.02.2022'},
         {time: '25.02.2022'},
         {time: '26.02.2022'},
         {time: '27.02.2022'},
         {time: '28.02.2022'}
     ]
     
     

    //  console.log(timer.map(t=> { return { 'x': t.time, 'y': props.expenses.category[0].data.filter(e=> DataTransformation(e.time) === t.time).length !== 0
    //  ? props.expenses.category[0].data[props.expenses.category[0].data.map(a=> DataTransformation(a.time)).indexOf(t.time)].num
    //  : 1 
    // }}))

    // console.log(props.expenses.category.map(a => {
    //     return {
    //         'id': a.nameRus,
    //         'data': timer.map(t=> { return { 'x': t.time, 'y': props.expenses.category[0].data.filter(e=> DataTransformation(e.time) === t.time).length !== 0
    //         ? props.expenses.category[0].data[props.expenses.category[0].data.map(a=> DataTransformation(a.time)).indexOf(t.time)].num
    //         : 1 
    //        }})
    //     }
    
    //     }
    // ))


    const data = props.expenses.category.map(a => {
        return {
            'id': a.nameRus,
            'data': timer.map(t=> { return { 
                'x': t.time, 
                'y': a.data.filter(e => DataTransformation(e.time) === t.time).length !== 0
            ? a.data[a.data.map(b=> DataTransformation(b.time)).indexOf(t.time)].num
            : 0 
           }})
        }
    
        }
    )
    console.log(data)

    const data1 = props.expenses.category.map(a => {
        return {
            'id': a.nameRus,
            'data': a.data.map(a => { return { 'x': a.time, 'y': a.num } })
        }
    }
    )


    const color = props.expenses.category.map(a => a.color)



    return (
        <div className={s.graff}>
            <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 40, bottom: 110, left: 80 }}
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
               
                  "tooltip": {        // настройка подсказок всплывающих
                      "container": {
                          "background": "#ffffff",
                          "color": "#333333",
                          "fontSize": 16
                      },
                      "basic": {},
                      "chip": {},
                      "table": {},
                      "tableCell": {},
                      "tableCellValue": {}
                  }
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
        sliceTooltip={({ slice }) => {
            return (
                <div
                    style={{
                        background: 'white',
                        padding: '9px 12px',
                        border: '1px solid #ccc',
                    }}
                >
                    <div>x: {slice.x}</div>
                   
                </div>
            )
        }}
        legends={[
            {
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: -40,
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
       yScale={{
            
            min: 0,
            max: 200,
            stacked: false,
            reverse: true
        }}
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

let mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    }
}

export default connect(mapStateToProps)(Grafs)

