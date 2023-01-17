import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const DiagrammTop = (props) => {
  const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
    let total = 0;
    dataWithArc.forEach((datum) => {
      total += Number(datum.value);
    });

    return (
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: String(total).length < 3 ? '52px' : '40px',
          fontWeight: 600,
        }}>
        {props.selectDiagramm !== 'RUB'
          ? Math.round(total)
          : Math.round(total) + 'т.р.'}
      </text>
    );
  };

  let totalSumm = props.diagramm.category
    .map((a) => a.data.map((b) => b.amount).reduce((acc, num) => acc + num, 0))
    .reduce((acc, num) => acc + num, 0);

  const data = () => {
    if (props.selectDiagramm === 'USD') {
      return props.diagramm.category.map((a) => {
        return {
          id: a.name,
          label: a.name,
          value: Math.round(
            a.data.map((b) => b.amount).reduce((acc, num) => acc + num, 0) /
              props.dollar
          ),
          color: a.color,
        };
      });
    } else if (props.selectDiagramm === 'BYN') {
      return props.diagramm.category.map((a) => {
        return {
          id: a.name,
          label: a.name,
          value: Math.round(
            a.data.map((b) => b.amount).reduce((acc, num) => acc + num, 0)
          ),
          color: a.color,
        };
      });
    } else if (props.selectDiagramm === 'EUR') {
      return props.diagramm.category.map((a) => {
        return {
          id: a.name,
          label: a.name,
          value: Math.round(
            a.data.map((b) => b.amount).reduce((acc, num) => acc + num, 0) /
              props.euro
          ),
          color: a.color,
        };
      });
    } else if (props.selectDiagramm === 'RUB') {
      return props.diagramm.category.map((a) => {
        return {
          id: a.name,
          label: a.name,
          value: (
            a.data.map((b) => b.amount).reduce((acc, num) => acc + num, 0) /
            props.ruble /
            10
          ).toFixed(1),
          color: a.color,
        };
      });
    }
    return props.diagramm.category.map((a) => {
      return {
        id: a.name,
        label: a.name,
        value: (
          (a.data.map((b) => b.amount).reduce((acc, num) => acc + num, 0) /
            totalSumm) *
          100
        ).toFixed(2),
        color: a.color,
      };
    });
  };

  const color = props.diagramm.category.map((a) => a.color);

  return (
    <ResponsivePie
      data={data()}
      margin={{
        top: 70,
        right: 70,
        bottom: 40,
        left: -80,
      }}
      theme={
        // объект добавления свойств диаграммы
        {
          fontSize: 16,
          // "background": "#ffffff",
          // "textColor": "#333333",
        }
      }
      innerRadius={0.65} // внутренний радиус
      padAngle={2} // расстояние между частями диаграммы в градусах
      cornerRadius={8} // радиус скругления краёв частей диаграммы
      activeInnerRadiusOffset={25} // увеличение внутреннего радиуса при наведении
      activeOuterRadiusOffset={20} // увеличение внешнего радиуса при наведении
      layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
      colors={color}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLinkLabelsSkipAngle={16} // угол при котором не отображается линия выноска
      arcLinkLabelsTextColor="#fff"
      arcLinkLabelsTextOffset={4} // расстояние от текста долинии выноски
      arcLinkLabelsOffset={2} // длина наклонной линии выноски
      arcLinkLabelsStraightLength={12} // длина прямой линии выноски
      arcLinkLabelsThickness={2} // толщина линии выноски
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={props.selectDiagramm !== 'RUB' ? 16 : 20} //угол при котором не отображаются значения диаграммы
      arcLabelsTextColor="black" // цвет значений диаграммы
      legends={[
        {
          anchor: 'top-right',
          direction: 'column',
          justify: false,
          translateX: 40,
          translateY: -40,
          itemsSpacing: 5,
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
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
};

export default DiagrammTop;
