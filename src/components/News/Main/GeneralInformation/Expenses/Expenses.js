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

        const timer = DateFunc(new Date())
        let keyArray = []
        let valueArray =[]
        for (let key in values) {
            
            if (values[key]) {
                keyArray.push(key)
                valueArray.push(values[key])
            }
        }

        let text = keyArray.map(a => diagramm.find(b => b.nameRus === a).nameRusСase).join(', ') 
     
        props.addText(`Расходы на  "${text}" добавлены ...`)
        props.addActivHedgehog(true)

        props.addDiagramm(keyArray, valueArray, timer)
        deActivateEditMode()
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
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            //initialValues={{}}
                            onFinish={onFinish}
                            //onFinishFailed={onFinishFailed}
                            autoComplete="off">

                            {diagramm.map(a =>
                                <Form.Item style={{ marginBottom: 0 }}
                                    label={a.nameRusСase}
                                    name={a.nameRus}
                                    key={a.nameRus} >
                                    <Input  type='number' onInput={funcValidNumber} step='0.01' />
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


