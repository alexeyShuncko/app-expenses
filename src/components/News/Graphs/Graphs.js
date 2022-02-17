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
         {time: '16.02.2022'}
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
            {/* <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 80, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
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
            legendOffset: 70,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Потраченная сумма денег',
            legendOffset: -45,
            legendPosition: 'middle'
        }}
        colors={color}
        pointSize={5}
        pointColor="black"
        pointBorderWidth={3}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabelYOffset={-18}
        enableArea={true}
         enableSlices="x"
        areaOpacity={0.1}
        useMesh={true}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 115,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 4,
                symbolSize: 20,
                symbolShape: 'circle',
                itemDirection: 'left-to-right',
                itemTextColor: '#777',
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
        ]}
        /> */}
            <ResponsiveBump
                data={data}
                yScale={{
            min: 'auto',
            max: 'auto',
            reverse: false
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
            />
        </div>
    )

}

let mapStateToProps = (state) => {
    return {
        expenses: state.expenses
    }
}

export default connect(mapStateToProps)(Grafs)

