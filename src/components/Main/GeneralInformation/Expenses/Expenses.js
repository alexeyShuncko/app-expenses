import React, { useState } from 'react';
import s from './Expenses.module.css';
import { DateFunc } from '../../../helpers/DateFunc/DateFunc';
import { Button, Form, Input, Space, Select } from 'antd';


const Expenses = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [store, setStore] = useState({})

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }


    const diagramm = props.diagramm.category

    const funcValidNumber = (e) => {      // максимальная длинна 7 символов и 2 после запятой
        if (e.target.value.includes(".")) {
            e.target.value = e.target.value.substring(0, e.target.value.indexOf(".") + 3);
        }
        if (e.target.value.length > 7) {
            e.target.value = e.target.value.substr(0, 7)
        }
    }

    const onFinish = (values) => {


        const arrSuffics = Object.keys(store)

        let keyArray = []
        let valueArray = []
        let valutaArray = []
        for (let key in values) {

            if (values[key] && !arrSuffics.includes(key)) {
                keyArray.push(key)
                valueArray.push(values[key])
                valutaArray.push(values[arrSuffics[diagramm.indexOf(diagramm.find(a => a.name === key))]])
            }
        }


        if (keyArray.length === 0) {
            props.addText(`Вы не ввели ни одного расхода ...`)
            props.addActivHedgehog(true)
        }
        else {
            const timer = DateFunc(new Date())

            const converterValute = (arr, index) => {
                if (valutaArray[index] === "BYN") {
                    return arr[index]
                }
                else if (valutaArray[index] === "USD") {
                    return (arr[index] * props.diagramm.exchangeRates.dollar.Cur_OfficialRate).toFixed(2)
                }
                else if (valutaArray[index] === "EUR") {
                    return (arr[index] * props.diagramm.exchangeRates.euro.Cur_OfficialRate).toFixed(2)
                }
                else if (valutaArray[index] === "RUB") {
                    return ((arr[index] / 100) * props.diagramm.exchangeRates.ruble.Cur_OfficialRate).toFixed(2)
                }
            }


            let data = keyArray.map((a, index) => {

                return {
                    "created": timer,
                    "amount": converterValute(valueArray, index),
                    "currency": "BYN",
                    "category": props.diagramm.category.find(b => b.name === a).id
                }
            })

            let text = keyArray.map(a => diagramm.find(b => b.name === a).nameRusCase).join(', ')

            props.addText(`Расходы на  "${text}" добавлены ...`)
            props.addActivHedgehog(true)
          
            props.addDiagramm(data)
            deActivateEditMode()
        }
    }


    const onMouseOver = (e) => {
        e.target.style.borderColor = diagramm.find(a => a.name === e.target.name).color
    }
    const onMouseOut = (e) => {
        e.target.style.borderColor = '#d9d9d9'
    }


    const suffixSelector =
        diagramm.map((a, index) => (
            <Form.Item name={`suffix${index}`} noStyle key={a.name}>
                <Select
                    style={{
                        width: 70,
                    }}
                >
                    <Select.Option value="BYN">BYN</Select.Option>
                    <Select.Option value="USD">USD</Select.Option>
                    <Select.Option value="EUR">EUR</Select.Option>
                    <Select.Option value="RUB">RUB</Select.Option>
                </Select>
            </Form.Item>
        ))


    !store['suffix0'] && diagramm.map((a, index) => store[`suffix${index}`] = "BYN")

    return (
        <div className={s.expenses}>

            {!editMode
                ? <div className={s.buttonExpenses}>
                    <Button type="primary"
                        size='large'
                        danger
                        onClick={activateEditMode}>Добавить расходы</Button>
                </div>

                :
                <div>
                    <div className={s.formExpensesName}>Расходы на :</div>
                    <div className={s.formExpensesFild}>

                        <Form
                            name="expenses"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={store}
                            onFinish={onFinish}
                            //onFinishFailed={onFinishFailed}
                            autoComplete="off">

                            {diagramm.map((a, index) =>
                                <Form.Item style={{ marginBottom: 0 }}
                                    label={a.nameRusCase}
                                    name={a.name}
                                    key={a.name}
                                //hasFeedback 
                                >
                                    <Input
                                        addonAfter={suffixSelector[index]}
                                        name={a.name}
                                        onMouseOver={onMouseOver}
                                        onMouseOut={onMouseOut}
                                        type='number' onInput={funcValidNumber} step='0.01' />
                                </Form.Item>
                            )
                            }

                            <Form.Item wrapperCol={{ offset: 8 }} style={{ marginTop: 10 }}>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit">
                                        Добавить
                                    </Button>
                                    <Button type="primary" danger onClick={deActivateEditMode}>
                                        Назад
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Expenses


