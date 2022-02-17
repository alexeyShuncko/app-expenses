import React from 'react';
import { ResponsivePie } from '@nivo/pie'



const DiagrammTop = (props) => {


    let totalSumm = props.diagramm.category.map(a =>a && a.summ).reduce((acc, num) => acc + num, 0)

   const  data =()=> {

    if (props.selectDiagramm === 'USD') {
        return props.diagramm.category.map(a=> { return { 
            'id': a.nameRus,  
        "label": a.nameRus,
        "value": (a.summ / props.dollar).toFixed(0),
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
        "value": (a.summ / props.euro).toFixed(0),
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
        margin={{ top: 60, right: 80, bottom: 60, left: 0 }}
        valueFormat=" >-2"
        //sortByValue={true}  упорядочивание по значению по умолчанию false
        innerRadius={0.65}  // внутренний радиус
        padAngle={2}        // расстояние между частями диаграммы в градусах
        cornerRadius={8}    // радиус скругления краёв частей диаграммы
        activeOuterRadiusOffset={8}
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
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: -73,
                translateY: -102,
                itemsSpacing: 8,
                itemWidth: 0,
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



