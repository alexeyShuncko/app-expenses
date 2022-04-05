import React from "react";
import s from './TotalIncome.module.css';
import HocValuta from "../../../HOC/HocValuta";
import { DataTransformation } from "../../../helpers/DataTransformation/DataTransformation";
import Message from "../../../helpers/Message/Message";
import { Table } from "antd";
import moment from 'moment';



const TotalIncome = (props) => {


    // фильтрую в зависимости от выбранного периода
    let result =
        props.income.data.map(a => {
            return {
                name: a.name,
                color: a.color,
                data: a.data.filter(b => b.time >= (props.periodS || props.todayS)
                    && b.time <= (props.periodPo || props.todayPo))
            }
        })



    let newResult = result.map(a => a.data.map(d => {
        return {
            name: a.name, time: d.time, num: d.num, id: d.id, color: a.color
        }
    }))


    let total = newResult[0].concat(
        newResult[1] ? newResult[1] : [],
        newResult[2] ? newResult[2] : []
    )

    let totalSort = total.sort((a, b) => a.time > b.time ? 1 : -1)

  

    const columns = [
        {
            title: 'Доход',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            sorter: (a, b) => a.name.length - b.name.length,
            render: (text, record, index) =>
            <div style={{ backgroundColor: `rgba(${record.color.slice(4, -1)},0.6)`, padding: 8 }}>{text}</div>
        },
        {
            title: 'Дата',
            dataIndex: 'time',
            key: 'time',
            align:'center',
            sorter: (a, b) => moment(a.time) - moment(b.time),
            render: (text, record, index) =>
            <div style={{ backgroundColor: `rgba(${record.color.slice(4, -1)},0.6)`, padding: 8 }}>{text}</div>
        },
        {
            title: 'Сумма',
            dataIndex: 'num',
            key: 'num',
            align:'center',
            sorter: (a, b) => a.num - b.num,
            render: (text, record, index) =>
            <div style={{ backgroundColor: `rgba(${record.color.slice(4, -1)},0.6)`, padding: 8 }}>{text}</div>
        }
    ]
 
    const data = totalSort.map(a=> ({...a, key: a.id}))

    const totalSumm = total.map(a => a.num).reduce((sum, current) => sum + current, 0)

    let dateS = DataTransformation(props.periodS || props.todayS)
    let datePo = DataTransformation(props.periodPo || props.todayPo)


    let textMessage =
        `Нет доходов с ${dateS} по ${datePo} ...`

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
                            Всего заработано с {dateS} по {datePo}:
                        </div>
                        <HocValuta
                            value='statisticTotal'
                            totalSumm={totalSumm}
                            exchangeRates={props.exchangeRates} />
                    </div>
                </div>
                : <div>
                    <Message textMessage={textMessage} idMessage='messageTableTotal' />
                </div>
            }
        </div>
    )
}

export default TotalIncome