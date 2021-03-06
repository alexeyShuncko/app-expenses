import React from "react";
import s from './TotalExpenses.module.css';
import HocValuta from "../../../HOC/HocValuta";
import { DataTransformation } from "../../../helpers/DataTransformation/DataTransformation";
import Message from "../../../helpers/Message/Message";
import moment from 'moment';
import { Table } from "antd";
import Converter_V_RGB from "../../../helpers/converter/converter";


const TotalTableExpenses = (props) => {

    const category = props.diagramm.category


    // фильтрую в зависимости от выбранного периода
    let result = category.map(a => {
        return {
            name: a.name,
            color: a.color,
            data: a.data.filter(b => b.created >= (props.periodS || props.todayS)
                && b.created <= (props.periodPo || props.todayPo))
        }
    })


    let newResult = result.map(a => a.data.map(d => {
        return {
            name: a.name, color: a.color, created: d.created, amount: d.amount, id: d.id
        }
    }))

// Переделать циклом
    let total = newResult[0].concat(
        newResult[1] ? newResult[1] : [],
        newResult[2] ? newResult[2] : [],
        newResult[3] ? newResult[3] : [],
        newResult[4] ? newResult[4] : [],
        newResult[5] ? newResult[5] : [],
        newResult[6] ? newResult[6] : [],
        newResult[7] ? newResult[7] : [],
        newResult[8] ? newResult[8] : [],
        newResult[9] ? newResult[9] : [],
        newResult[10] ? newResult[10] : [],
        newResult[11] ? newResult[11] : [],
        newResult[12] ? newResult[12] : [],
        newResult[13] ? newResult[13] : [])  // соединяю массивы ...........



    let totalSort = total.sort((a, b) => a.created > b.created ? 1 : -1)            //сортировка по времени 


    const columns = [
        {
            title: 'Категория',
            dataIndex: 'name',
            key: 'key',
            align:'center',
            sorter: (a, b) => a.name.length - b.name.length,
              render: (text, record, index) =>
              <div style={{ backgroundColor: `rgba(${Converter_V_RGB(record.color).slice(4, -1)},0.6)`, padding: 8}}>{text}</div>
        },
        {
            title: 'Дата',
            dataIndex: 'created',
            key: 'key',
            align:'center',
            sorter: (a, b) => moment(a.created) - moment(b.created),
              render: (text, record, index) =>
              <div style={{ backgroundColor: `rgba(${Converter_V_RGB(record.color).slice(4, -1)},0.6)`, padding: 8}}>{text}</div>
        },
        {
            title: 'Сумма',
            dataIndex: 'amount',
            key: 'key',
            align:'center',
            sorter: (a, b) => a.amount - b.amount,
              render: (text, record, index) =>
              <div style={{ backgroundColor: `rgba(${Converter_V_RGB(record.color).slice(4, -1)},0.6)`, padding: 8}}>{text}</div>
        }
    ]
    const data = totalSort.map(a => ({ ...a, key: a.id }))

    const totalSumm = total.map(a => a.amount).reduce((sum, current) => sum + current, 0)

    let dateS = DataTransformation(props.periodS || props.todayS)
    let datePo = DataTransformation(props.periodPo || props.todayPo)

    let textMessage =
        `Нет расходов с ${dateS} по ${datePo} ...`

    return (
        <div className={s.statisticDateTable}>

            {totalSort.length !== 0
                ? <div className={s.statisticTable}>

                    <Table
                     rowClassName={s.row}
                        columns={columns}
                        dataSource={data}
                        size="small"
                        pagination={{
                            pageSize: '9'
                        }}
                        bordered
                    />
                    <div className={s.totalSumm}>
                        <div>
                            Всего потрачено с {dateS} по {datePo}:
                        </div>
                        <HocValuta
                            value='statisticTotal'
                            totalSumm={totalSumm}
                            exchangeRates={props.diagramm.exchangeRates} />
                    </div>
                </div>
                : <div>
                    <Message textMessage={textMessage} idMessage='messageTableTotal' />
                </div>
            }
        </div>
    )
}

export default TotalTableExpenses