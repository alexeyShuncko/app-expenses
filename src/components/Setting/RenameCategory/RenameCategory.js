import React, { useState } from 'react';
import s from './RenameCategory.module.css';
import { Button, Form, Input, Select, Space } from 'antd';



const RenameCategory = (props) => {
    const [color, setColor ]= useState(props.diagramm.category[0].color)

    const [form] = Form.useForm()

    const diagramm = props.diagramm.category

    const returnSetting = () => {
        window.history.back()
    }
    const funcValidText = (e) => {   // валидация ввода, только русские буквы
        const regex1 = /[^А-ЯЁа-яё]/
        const regexEng = /[A-Za-z]/
        if (regexEng.test(e.target.value)) {
            props.addText('Переключите на русский язык ...')
            props.addActivHedgehog(true)
        }
        e.target.value = e.target.value.replace(regex1, '')
    }


      
    const onColor = (value) => {
       
        setColor((props.diagramm.category.find(a=>a.name===value).color))
      }


    const validator = (rule, value) => {
        const regex1 = /[A-Za-z]/
        if (value && props.diagramm.category.find(a => a.name.toLowerCase() === value.toLowerCase())) {
            return Promise.reject(new Error(`Категория "${value}" уже есть!`))
        }
        else if (regex1.test(value)) {
            return Promise.reject(new Error(`Только русский язык!`))
        }
        else return Promise.resolve()
    }



    const onFinish = (values) => {

        let name = values.name.slice(0,1).toUpperCase() + values.name.slice(1).toLowerCase()

       
        props.updateItemCategories(
            name, 
            props.diagramm.category.find(a => a.name === values.select).color,
            props.diagramm.category.find(a => a.name === values.select).id,
            props.diagramm.activ.id
        )

        props.addText(`"${values.select}" переименована в  "${name}" ...`)
        props.addActivHedgehog(true)

        form.resetFields()
        setColor(props.diagramm.category[0].color)
        if (props.diagramm.activ.name === values.select) {
            props.addActiv(props.diagramm.category.find(a => a.name === values.select))
        }
    }


    return (
        <div>
            <div className={s.title}>Переименование категории</div>
            <div className={s.item}>

                <Form className={s.form}
                    form={form}
                    name="renameCategory"
                    labelCol={{ span: 11 }}
                    wrapperCol={{ span: 10 }}
                    onFinish={onFinish}
                    initialValues={{ select: props.diagramm.category[0].name}}
                    //onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    style={{marginBottom: 10}}
                        label="Название категории"
                        name='select'>
                        <Select
                         className={s.selectCateg}
                         style={{ backgroundColor: `rgba(${color.slice(4, -1)},0.6)`}}
                         onChange={onColor}
                         >
                            {diagramm.map(a =>
                                <Select.Option value={a.name}
                                    key={a.name}
                                    style={{ backgroundColor: `rgba(${a.color.slice(4, -1)},0.6)` }}
                                >
                                    {a.name}
                                </Select.Option >)}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Новое название категории"
                        name="name"
                        hasFeedback
                        rules={[{ required: true, message: 'Впишите новое название категории!' },
                        { validator: validator }]}>
                        <Input onInput={funcValidText} maxLength='14' />
                    </Form.Item>


                    <Form.Item
                        style={{ marginTop: 30 }}
                        wrapperCol={{ offset: 10 }}>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit">
                                Переименовать
                            </Button>
                            <Button type="primary" danger onClick={returnSetting}>
                                Назад
                            </Button>
                        </Space>
                    </Form.Item>

                </Form>


                <div className={s.instruction}>
                    <div className={s.instructionTitle}>
                        Чтобы переименовать категорию, следуйте ниже приведенным шагам:</div>
                    <div>
                        <div>1) Выберите категорию из выпадающего списка "Название категории"</div>
                        <div>2) В поле "Новое название категории" впишите новое название категории<br></br>
                            (Название не должно совпадать с уже имеющимися категориями,<br></br>
                             должно быть длинною до 14 символов и на русском языке)
                        </div>
                        <div>3) Нажмите кнопку "Переименовать"</div>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default RenameCategory