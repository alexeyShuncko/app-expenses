import React, { useState } from 'react';
import s from './StatisticTable.module.css';
import HocValuta from '../../HOC/HocValuta';
import Message from '../../helpers/Message/Message';
import { DataTransformation } from '../../helpers/DataTransformation/DataTransformation';
import { Table } from 'antd';
import Converter_V_RGB from '../../helpers/converter/converter';
import { coefficientFunc } from '../../helpers/CoefficientFunc';

const StatisticTable = (props) => {
  const [totalValuta, setTotalValuta] = useState('BYN');

  const coefficient = coefficientFunc(
    totalValuta,
    props.diagramm.exchangeRates.dollar.Cur_OfficialRate,
    props.diagramm.exchangeRates.euro.Cur_OfficialRate,
    props.diagramm.exchangeRates.ruble.Cur_OfficialRate
  );

  const styles = {
    borderBottom: `solid 3px ${
      props.diagramm.category.filter((a) =>
        props.diagramm.activ.id ? a.id === props.diagramm.activ.id : a
      )[0].color
    }`,
  };

  const category = props.diagramm.category;

  let filterTable = category
    .filter((a) =>
      props.diagramm.activ.id
        ? a.id === props.diagramm.activ.id
        : a.name === category[0].name
    )[0]
    .data.filter(
      (b) =>
        b.created <= (props.diagramm.period[0].Po || props.diagramm.today.po) &&
        b.created >= (props.diagramm.period[0].S || props.diagramm.today.s)
    );

  const funColor = () => {
    if (category.find((a) => a.id === props.diagramm.activ.id)) {
      return category.find((a) => a.id === props.diagramm.activ.id).color;
    } else return category[0].color;
  };
  let color = Converter_V_RGB(funColor());

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'created',
      key: 'key',
      align: 'center',
      sorter: (a, b) => new Date(a.created) - new Date(b.created),
      render: (text, record, index) => (
        <div
          style={{
            backgroundColor: `rgba(${color.slice(4, -1)},0.6)`,
            padding: 8,
          }}>
          {text}
        </div>
      ),
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'key',
      align: 'center',
      sorter: (a, b) => a.amount - b.amount,
      render: (text, record, index) => (
        <div
          style={{
            backgroundColor: `rgba(${color.slice(4, -1)},0.6)`,
            padding: 8,
          }}>
          {text}
        </div>
      ),
    },
  ];
  const data = filterTable.map((a) => ({
    ...a,
    key: a.id,
    amount: (a.amount / coefficient).toFixed(2),
  }));

  let dateS = DataTransformation(
    props.diagramm.period[0].S || props.diagramm.today.s
  );
  let datePo = DataTransformation(
    props.diagramm.period[0].Po || props.diagramm.today.po
  );

  let textMessage = `Нет расходов с ${dateS} по ${datePo} 
    на "${
      props.diagramm.activ.name &&
      category.find((a) => a.id === props.diagramm.activ.id).nameRusCase
    }" ...`;

  return (
    <div className={s.statisticDateTable}>
      <div>Таблица расходов по выбранной категории за выбранный период. </div>

      {filterTable.length !== 0 ? (
        <div>
          <Table
            rowClassName={s.row}
            columns={columns}
            dataSource={data}
            size="small"
            pagination={{
              pageSize: '10',
            }}
            bordered
          />

          <div className={s.statisticDateSumm} style={styles}>
            Потрачено на{' '}
            <span className={s.categorySumm}>
              {props.diagramm.activ.name &&
                category.filter((a) => a.id === props.diagramm.activ.id)[0]
                  .nameRusCase}
            </span>
            <div>
              {' '}
              с {dateS} по {datePo}{' '}
            </div>
            <div className={s.totalCategory}>
              <HocValuta
                tableValuta={setTotalValuta}
                value="statisticTable"
                filterTable={filterTable}
                exchangeRates={props.diagramm.exchangeRates}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Message textMessage={textMessage} idMessage="messageTable" />
        </div>
      )}
    </div>
  );
};

export default StatisticTable;
