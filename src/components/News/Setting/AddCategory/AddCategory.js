import React from 'react';
import s from './AddCategory.module.css';
import { Button, Form, Input, Space } from 'antd';


const AddCategory = (props) => {

    const [form] = Form.useForm();

    const returnSetting = () => {
        window.history.back()
    }

    const funcValidText = (e) => {    // валидация ввода, только русские буквы ... подумать над пробелом !!!!
        const regex1 = /[^А-ЯЁа-яё]/  //  и несколькими словами....
        const regexEng = /[A-Za-z]/

        if (regexEng.test(e.target.value)) {
            props.addText('Переключите на русский язык ...')
            props.addActivHedgehog(true)
        }
        e.target.value = e.target.value.replace(regex1, '')
    }


    const validateMessages = {
        required: 'Напишите название категории!',
    }


    const onFinish = (values) => {

        form.resetFields()
        props.addText(`Категория "${values.addCategory}" добавлена ...`)
        props.addActivHedgehog(true)

        props.addCategory(values.addCategory, values.color)
        props.nameCase(values.addCategory) // добавление имени в винительном падеже
    }


    const validator = (rule, value) => {
        if (value && props.diagramm.category.find(a => a.nameRus.toLowerCase() === value.toLowerCase())) {
            return Promise.reject(new Error(`Категория "${value}" уже есть!`))
        }
        return Promise.resolve()
    }


    return (
        <div>
            <div className={s.title}>Добавление категории</div>
            <div className={s.item}>

                <Form className={s.form}
                    form={form}
                    name="addCategory"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 10 }}
                    onFinish={onFinish}

                    validateMessages={validateMessages}
                    //onFinishFailed={onFinishFailed}
                    autoComplete="off"   >

                    <Form.Item style={{ marginBottom: 10 }}
                        label="Название категории"
                        name="addCategory"
                        hasFeedback
                        rules={[{ required: true }, { validator: validator }]}>
                        <Input onInput={funcValidText} maxLength='14' />
                    </Form.Item>

                    <Form.Item
                        label="Цвет"
                        name="color"
                        hasFeedback
                        rules={[{ required: true, message: 'Выберите цвет!' }]}
                    >
                        <Input type='color' />
                    </Form.Item>

                    <div className={s.inform}>
                        Уже имеющиеся категории и их цвета:

                        <ul>
                            {props.diagramm.category.map(a =>

                                <li key={a.nameRus} >
                                    <div className={s.colorCategory}>
                                        <span className={s.name}>
                                            {a.nameRus}
                                        </span>
                                        <span className={s.nameColor}>
                                            <span
                                                key={a.nameRus}
                                                className={s.legend}
                                                style={{ backgroundColor: ` ${a.color}` }}>&nbsp;
                                            </span>
                                        </span>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>


                    <Form.Item 
                    style={{ marginTop: 30 }}
                    wrapperCol={{ offset: 9 }}>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit">
                                Добавить
                            </Button>
                            <Button type="primary" danger onClick={returnSetting}>
                                Назад
                            </Button>
                        </Space>
                    </Form.Item>

                </Form>



                <div className={s.instruction}>
                    <div className={s.instructionTitle}>
                        Чтобы добавить категорию, следуйте ниже приведенным шагам:</div>
                    <div>
                        <div>1) В поле "Название категории" впишите название новой категории <br></br>
                            (Название не должно совпадать с уже имеющимися категориями и должно быть длинною до 14 символов)</div>
                        <div>2) Нажмите на чёрный прямоугольник в поле "Цвет"</div>
                        <div>3) Выберите нужный тебе цвет <br></br>
                            (Цвет не должен совпадать с уже используемыми цветами, для визуального отличия категорий)</div>
                        <div>4) Нажмите в любое место экрана, кроме окна выбора цвета</div>
                        <div>5) Нажмите кнопку "Добавить"</div>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default AddCategory