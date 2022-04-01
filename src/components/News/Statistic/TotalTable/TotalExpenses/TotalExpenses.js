import React from "react";
import s from './TotalExpenses.module.css';
import HocValuta from "../../../HOC/HocValuta";
import { DataTransformation } from "../../../helpers/DataTransformation/DataTransformation";
import Message from "../../../helpers/Message/Message";
import moment from 'moment';
import { Table } from "antd";


const TotalTableExpenses = (props) => {

    const category = props.diagramm.category


    // фильтрую в зависимости от выбранного периода
    let result = category.map(a => {
        return {
            nameRus: a.nameRus,
            color: a.color,
            data: a.data.filter(b => b.time >= (props.periodS || props.todayS)
                && b.time <= (props.periodPo || props.todayPo))
        }
    })


    let newResult = result.map(a => a.data.map(d => {
        return {
            name: a.nameRus, color: a.color, time: d.time, num: d.num, id: d.id
        }
    }))


    let total = newResult[0].concat(
        newResult[1] ? newResult[1] : [],
        newResult[2] ? newResult[2] : [],
        newResult[3] ? newResult[3] : [],
        newResult[4] ? newResult[4] : [],
        newResult[5] ? newResult[5] : [])  // соединяю массивы ...........


    let totalSort = total.sort((a, b) => a.time > b.time ? 1 : -1)            //сортировка по времени 


    const columns = [
        {
            title: 'Категория',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            sorter: (a, b) => a.name.length - b.name.length,
            // render: (text, record, index) =>
            // <div style={{ backgroundColor: `rgba(${record.color.slice(4, -1)},0.6)`, padding: 8 }}>{text}</div>
        },
        {
            title: 'Дата',
            dataIndex: 'time',
            key: 'time',
            align:'center',
            sorter: (a, b) => moment(a.time) - moment(b.time),
            // render: (text, record, index) =>
            // <div style={{ backgroundColor: `rgba(${record.color.slice(4, -1)},0.6)`, padding: 8 }}>{text}</div>
        },
        {
            title: 'Сумма',
            dataIndex: 'num',
            key: 'num',
            align:'center',
            sorter: (a, b) => a.num - b.num,
            // render: (text, record, index) =>
            // <div style={{ backgroundColor: `rgba(${record.color.slice(4, -1)},0.6)`, padding: 8 }}>{text}</div>
        }
    ]
    const data = totalSort.map(a => ({ ...a, key: a.id }))

    const totalSumm = total.map(a => a.num).reduce((sum, current) => sum + current, 0)

    let dateS = DataTransformation(props.periodS || props.todayS)
    let datePo = DataTransformation(props.periodPo || props.todayPo)

    let textMessage =
        `Нет расходов с ${dateS} по ${datePo} ...`

    return (
        <div className={s.statisticDateTable}>

            {totalSort.length !== 0
                ? <div className={s.statisticTable}>

                    <Table
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