import React from 'react';
import s from './Color.module.css';
import { Button, Form, Input, Select, Space } from 'antd';



const Color = (props) => {

    const [form] = Form.useForm()
   
    const onColor = (value) => {
        form.setFieldsValue({ color: props.diagramm.category.find(a=>a.nameRus===value).color })
      }

    const returnSetting = () => {
        window.history.back()
    }


    const validator = (rule, value) => {
        if (value && props.diagramm.category.find(a => a.color === value)) {
            return Promise.reject(new Error(`Вы не изменили цвет!`))
        }
        return Promise.resolve()
    }


    const onFinish = (values) => {

        props.addEditColor(values.name, values.color)
        props.addText(`Цвет категории "${values.name}" изменен...`)
        props.addActivHedgehog(true)

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
                    labelCol={{ span: 11 }}
                    wrapperCol={{ span: 8 }}
                    initialValues={{
                        name: props.diagramm.category[0].nameRus, 
                        color: props.diagramm.category[0].color 
                    }}
                    onFinish={onFinish}
                    autoComplete="off">


                    <Form.Item
                        label="Категория"
                        name='name'
                        style={{ marginBottom: 10 }}>
                        
                        <Select onChange={onColor}>
                            {props.diagramm.category.map(a =>
                                <Select.Option value={a.nameRus}
                                    key={a.nameRus}
                                //style={{ backgroundColor: ` ${a.color}` }}
                                >
                                    {a.nameRus}
                                </Select.Option >)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                    
                        style={{ marginBottom: 10 }}
                        label='Цвет'
                        name='color'
                        rules={[{ validator: validator }]}>
                        <Input   type='color' className={s.square} />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 5 }} style={{ marginTop: 30 }}>
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