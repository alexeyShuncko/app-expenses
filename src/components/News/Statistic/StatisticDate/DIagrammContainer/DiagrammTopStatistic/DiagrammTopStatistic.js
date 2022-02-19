import React from 'react';
import { ResponsivePie } from '@nivo/pie'




const DiagrammTopStatistic = (props) => {

   const  data =()=> {

    if (props.selectDiagramm === 'USD') {
        return props.diagramm.map(a=> { return { 
            'id': a.nameRus,  
        "label": a.nameRus,
        "value": ((a.data.map(e=>e.num).reduce((sum, current) => sum + current, 0)/ props.dollar)).toFixed(0),
        "color": a.color}})
    }
    else if (props.selectDiagramm === 'BYN') {
        return props.diagramm.map(a=> { return { 
            'id': a.nameRus,  
        "label": a.nameRus,
        "value": a.data.map(e=>e.num).reduce((sum, current) => sum + current, 0),
        "color": a.color}})
    }
    else if (props.selectDiagramm === 'EUR') {
        return props.diagramm.map(a=> { return { 
            'id': a.nameRus,  
        "label": a.nameRus,
        "value": ((a.data.map(e=>e.num).reduce((sum, current) => sum + current, 0)) / props.euro).toFixed(0),
        "color": a.color}})
    }
    return props.diagramm.map(a=> { return { 
        'id': a.nameRus,  
    "label": a.nameRus,
    "value": ((a.data.map(e=>e.num).reduce((sum, current) => sum + current, 0)/props.total)*100).toFixed(0),
    "color": a.color}})
         }

   const color = props.diagramm.map(a=> a.color)



return (
   
<ResponsivePie
        data={data()}
        margin={{ top: 60, right: 70, bottom: 40, left: 20 }}
        theme={{"fontSize": 14}}
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
                anchor: 'bottom-right',               // положение легенды относительно диаграмы
                direction: 'column',                  // легенда в строку или столбец
                justify: false,
                translateX: -20,                      // положение легенды по оси X
                translateY: -170,                    // положение легенды по оси Y
                itemsSpacing: 8,
                itemWidth: 0,
                itemHeight: 15,                      // расстояние между строками легенды
                itemTextColor: '#fff',               // цвет текста строк легенды
                itemDirection: 'left-to-right',
                itemOpacity: 1,                     // прозрачность легенды 
                symbolSize: 21,                    // размер цветов легенды
                symbolShape: 'circle',             // форма цветов легенды
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







