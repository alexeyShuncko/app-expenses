import React, { useState } from "react";
import s from './StatisticTable.module.css';
import HocValuta from "../../HOC/HocValuta";
import Message from "../../helpers/Message/Message";
import { DataTransformation } from "../../helpers/DataTransformation/DataTransformation";
import { Button, Table } from "antd";
import moment from 'moment';


const StatisticTable = (props) => {

    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }

    const styles = {
        borderBottom: `solid 3px ${props.diagramm.category.filter(a => props.diagramm.activ.id
            ? a.idCategory === props.diagramm.activ.id
            : a.idCategory === props.diagramm.category[0].idCategory)[0].color}`
    }


    const category = props.diagramm.category

    let filterTable = category
        .filter(a => props.diagramm.activ.id
            ? a.idCategory === props.diagramm.activ.id
            : a.nameRus === category[0].nameRus)[0].data
        .filter(b => b.time <= (props.diagramm.period[0].Po || props.diagramm.today.po)
            && b.time >= (props.diagramm.period[0].S || props.diagramm.today.s))


     let color = category.filter(a => a.idCategory === props.diagramm.activ.id)[0].color



    const columns = [
        {
            title: 'Дата',
            dataIndex: 'time',
            key: 'key',
            align: 'center',
            sorter: (a, b) => moment(a.time) - moment(b.time),
              render: (text, record, index) =>
                  <div style={{ backgroundColor: `rgba(${color.slice(4, -1)},0.6)`, padding: 8 }}>{text}</div>
        },
        {
            title: 'Сумма',
            dataIndex: 'num',
            key: 'key',
            align: 'center',
            sorter: (a, b) => a.num - b.num,
              render: (text, record, index) =>
                  <div style={{ backgroundColor: `rgba(${color.slice(4, -1)},0.6)`, padding: 8 }}>{text}</div>
        }
    ]
    const data = filterTable.map(a => ({ ...a, key: a.id }))

    

    let dateS = DataTransformation(props.diagramm.period[0].S || props.diagramm.today.s)
    let datePo = DataTransformation(props.diagramm.period[0].Po || props.diagramm.today.po)

    let textMessage =
        `Нет расходов с ${dateS} по ${datePo} 
    на "${props.diagramm.activ.name && category.filter(a => a.idCategory === props.diagramm.activ.id)[0].nameRusСase}" ...`


    return (
        <div className={s.statisticDateTable}>
            <div>Таблица расходов по выбранной категории за выбранный период. </div>
            {!editMode
                ? <div>
                    <Button type='primary' onClick={activateEditMode}>Показать</Button>
                </div>
                : <div >
                    <Button style={{ marginBottom: 17, marginTop: 17, }}
                        type='primary' danger onClick={deActivateEditMode}>Убрать</Button>

                    {filterTable.length !== 0
                        ? <div>
                            <Table
                             rowClassName={s.row}
                                columns={columns}
                                dataSource={data}
                                size="small"
                                pagination={{
                                    pageSize: '8'
                                }}
                                bordered
                            />

                            <div className={s.statisticDateSumm} style={styles}>
                                Потрачено на <span className={s.categorySumm}>
                                    {props.diagramm.activ.name &&
                                        category.filter(a => a.idCategory === props.diagramm.activ.id)[0].nameRusСase}
                                </span>
                                <div> с {dateS} по {datePo} </div>
                                <div className={s.totalCategory}>
                                    <HocValuta
                                        value='statisticTable'
                                        filterTable={filterTable}
                                        exchangeRates={props.diagramm.exchangeRates} />
                                </div>

                            </div>
                        </div>
                        : <div>
                            <Message textMessage={textMessage} idMessage='messageTable' />
                        </div>
                    }
                </div>}

        </div>
    )
}

export default StatisticTable