import React from 'react';
import s from './Color.module.css';
import { Button, Form, Input, Select, Space } from 'antd';
import Converter_V_HEX from '../../helpers/converter/converterHEX';
import Converter_V_RGB from '../../helpers/converter/converter';
import { useState } from 'react';



const Color = (props) => {
    let [color, setColor ]= useState(props.diagramm.category[0].color)
    const [form] = Form.useForm()
    
   
    const onColor = (value) => {
        form.setFieldsValue({ color: Converter_V_HEX(props.diagramm.category.find(a=>a.name===value).color) })
        setColor((props.diagramm.category.find(a=>a.name===value).color))
      }

    const returnSetting = () => {
        window.history.back()
    }



    const validator = (rule, value) => {
        
        if (props.diagramm.category.find(a => a.color === Converter_V_RGB(value))) {
            return Promise.reject(new Error(`Вы не изменили цвет!`))
        }
        return Promise.resolve()
    }


    const onFinish = (values) => {
       

        props.updateColor(
            values.name, 
            props.diagramm.category.find(a => a.name === values.name).nameRusCase,
            Converter_V_RGB(values.color),
            props.diagramm.category.find(a => a.name === values.name).id,
        )

        props.addText(`Цвет категории "${values.name}" изменен...`)
        props.addActivHedgehog(true)
        
        setColor(props.diagramm.category[0].color)
        form.resetFields()
        
    }


    return (
        <div className={s.changeСolor}>
            <div className={s.title}>Изменение цвета категории</div>

            <div className={s.color}>

                <Form
                    form={form}
                    className={s.form}
                    name="color"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 11 }}
                    initialValues={{
                        name: props.diagramm.category[0].name, 
                        color: Converter_V_HEX(props.diagramm.category[0].color)
                    }}
                    onFinish={onFinish}
                    autoComplete="off">


                    <Form.Item
                        label="Категория"
                        name='name'
                        style={{ marginBottom: 10 }}>
                        
                        <Select  
                        className={s.selectCateg}
                        style={{ backgroundColor: `rgba(${color.slice(4, -1)},0.6)`}}
                        onChange={onColor}>
                            {props.diagramm.category.map(a =>
                                <Select.Option 
                                value={a.name}
                                key={a.name}
                                style={{ backgroundColor: `rgba(${a.color.slice(4, -1)},0.6)` }}
                                >
                                    {a.name}
                                </Select.Option >)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{ span: 5 }}
                       
                        label='Цвет'
                        name='color'
                        rules={[{ validator: validator }]}>
                        <Input   type='color' className={s.square} />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 7 }} style={{ marginTop: 30 }}>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit">
                                Изменить цвет
                            </Button>
                            <Button type="primary" danger onClick={returnSetting}>
                                Назад
                            </Button>
                        </Space>
                    </Form.Item>

                </Form>

                <div className={s.instruction}>
                    <div className={s.instructionTitle}>
                        Чтобы изменить цвет категории, следуйте ниже приведенным шагам:</div>
                    <div>
                        <div>1) В поле "Название категории" выберите из выпадающего списка необходимую категорию</div>
                        <div>2) Нажав на поле "Цвет", выберите нужный Вам цвет</div>
                        <div>3) Нажмите в любое место экрана, кроме окна выбора цвета</div>
                        <div>4) Нажмите кнопку "Изменить цвет"</div>
                    </div>
                </div>
            </div>

        </div>

    )

}

export default Color