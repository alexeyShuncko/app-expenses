import React, { useState } from 'react';
import s from './Income.module.css';
import { DateFunc } from '../../../helpers/DateFunc/DateFunc';
import { Button, Form, Input, Select, Space } from 'antd';


const Income = (props) => {

    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deActivateEditMode = () => {
        setEditMode(false)
    }



    const funcValidNumber = (e) => {      // максимальная длинна 7 символов и 2 после запятой
        if (e.target.value.includes(".")) {
            e.target.value = e.target.value.substring(0, e.target.value.indexOf(".") + 3);
        }
        if (e.target.value.length > 7) {
            e.target.value = e.target.value.substr(0, 7)
        }
    }



    const onFinish = (values) => {
        const timer = DateFunc(new Date())

        const numValuta = () => {
            if (values.valuta === "BYN") {
                return Number(values.income)
            }
            else if (values.valuta === "USD") {
                return (Number(values.income) * props.diagramm.exchangeRates.dollar.Cur_OfficialRate).toFixed(2)
            }
            else if (values.valuta === "EUR") {
                return (Number(values.income) * props.diagramm.exchangeRates.euro.Cur_OfficialRate).toFixed(2)
            }
        }
        let num = numValuta()

        let category = props.diagramm.income.data.filter(a => a.name === values.name)[0].id


        props.addText(`Добавлено:  ${values.name} ${values.income} ${values.valuta} ...`)
        props.addActivHedgehog(true)

        // props.addSalaryMonth(values.name, (Number(timer.slice(5, 7)) + 1))

        const index = () =>  values.name === "Зарплата" ? 2 : 1 
          
        

        props.updateSalary(
           props.diagramm.income.salary.find(a=> a.source === index()).salary_day,
           (Number(timer.slice(5, 7)) + 1),
            props.diagramm.income.salary.find(a=> a.source === index()).source
        )

        props.addIncome(timer, num, category)
        deActivateEditMode()
    }


    return (
        <div className={s.expenses}>

            {!editMode
                ? <div className={s.incomeButton}>
                    <Button type="primary" size='large' onClick={activateEditMode}>Добавить доходы</Button>
                </div>

                :
                <div>
                    <div className={s.incomeName}>Доходы:</div>
                    <div className={s.formIncomeFild}>

                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ name: "Зарплата", valuta: "BYN" }}
                            onFinish={onFinish}
                            //onFinishFailed={onFinishFailed}
                            autoComplete="off"   >

                            <Form.Item
                                label="Доход"
                                name="name"

                                style={{ marginBottom: 0 }}>
                                <Select >
                                    {props.data.map(a =>
                                        <Select.Option
                                            //style={{backgroundColor: a.color}} 
                                            //value={a.name}
                                            key={a.name}>
                                            {a.name}
                                        </Select.Option>)
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 0 }}
                                label="Сумма"
                                name="income"
                                hasFeedback
                                rules={[{ required: true, message: 'Введите сумму!' }]}
                            >
                                <Input type='number' onInput={funcValidNumber} step='0.01' />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 10 }}
                                label="Валюта"
                                name="valuta"
                                wrapperCol={{ span: 8 }}>
                                <Select >
                                    <Select.Option value="BYN">BYN</Select.Option>
                                    <Select.Option value="USD">USD</Select.Option>
                                    <Select.Option value="EUR">EUR</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8 }}>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >
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

export default Income


