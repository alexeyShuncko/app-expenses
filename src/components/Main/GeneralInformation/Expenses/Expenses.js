import React, { useState } from 'react';
import s from './Expenses.module.css';
import { DateFunc } from '../../../helpers/DateFunc/DateFunc';
import { Button, Form, Input, Space } from 'antd';


const Expenses = (props) => {

    let [editMode, setEditMode] = useState(false)

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

        let keyArray = []
        let valueArray = []
        for (let key in values) {

            if (values[key]) {
                keyArray.push(key)
                valueArray.push(values[key])
            }
        }

        if (keyArray.length === 0) {
            props.addText(`Вы не ввели ни одного расхода ...`)
            props.addActivHedgehog(true)
        }
        else {
            const timer = DateFunc(new Date())

            let data = keyArray.map((a, index) => {

                return {
                    "created": timer,
                    "amount": valueArray[index],
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

    return (
        <div className={s.expenses}>

            {!editMode
                ? <div className={s.buttonExpenses}>
                    <Button type="primary" size='large' danger onClick={activateEditMode}>Добавить расходы</Button>
                </div>

                :
                <div>
                    <div className={s.formExpensesName}>Расходы на :</div>
                    <div className={s.formExpensesFild}>

                        <Form
                            name="expenses"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            //initialValues={{}}
                            onFinish={onFinish}
                            //onFinishFailed={onFinishFailed}
                            autoComplete="off">

                            {diagramm.map(a =>
                                <Form.Item style={{ marginBottom: 0 }}
                                    label={a.nameRusCase}
                                    name={a.name}
                                    key={a.name}
                                //hasFeedback 
                                >
                                    <Input
                                        name={a.name}
                                        onMouseOver={onMouseOver}
                                        onMouseOut={onMouseOut}
                                        type='number' onInput={funcValidNumber} step='0.01' />
                                </Form.Item>)
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


