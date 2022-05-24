import React from 'react';
import s from './AddCategory.module.css';
import { Button, Form, Input, Space } from 'antd';
import Converter_V_RGB from '../../helpers/converter/converter';



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

        let name = values.addCategory.slice(0,1).toUpperCase() + values.addCategory.slice(1).toLowerCase()

        props.addText(`Категория "${name}" добавлена ...`)
        props.addActivHedgehog(true)

        

         props.itemCategories(name, 
             values.color.indexOf('#') >=0 ? Converter_V_RGB(values.color) : values.color)

        // props.addCategory(values.addCategory, 
        //     values.color.indexOf('#') >=0 ? Converter_V_RGB(values.color) : values.color)
        // props.nameCase(values.addCategory) // добавление имени в винительном падеже
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

    const validatorColor = (rule, value) => {
        if (value && props.diagramm.category.find(a => a.color === Converter_V_RGB(value))) {
            return Promise.reject(new Error(`Такой цвет уже есть!`))
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
                    initialValues={{ color: '#db2ebe' }}
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
                        wrapperCol={{ span: 5 }}
                        label="Цвет"
                        name="color"
                        hasFeedback
                        rules={[{ required: true, message: 'Выберите цвет!' },
                        { validator: validatorColor }]}
                    >
                        <Input type='color' className={s.square} />
                    </Form.Item>

                    <div className={s.inform}>
                        Уже имеющиеся категории и их цвета:

                        <ul>
                            {props.diagramm.category.map(a =>

                                <li key={a.name} >
                                    <div className={s.colorCategory}>
                                        <span className={s.name}>
                                            {a.name}
                                        </span>
                                        <span className={s.nameColor}>
                                            <span
                                                key={a.name}
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


                <ol className={s.instruction}>
                    <div className={s.instructionTitle}>
                        Чтобы добавить категорию, следуйте ниже приведенным шагам:
                    </div>
                    <li> В поле "Название категории" впишите название новой категории</li>
                        (Название не должно совпадать с уже имеющимися категориями, должно быть <br></br>
                        длинною до 14 символов и на русском языке)
                    <li> Нажав на поле "Цвет", выберите цвет новой категории</li>
                    (Цвет не должен совпадать с уже используемыми цветами, для визуального отличия категорий)
                    <li> Нажмите в любое место экрана, кроме окна выбора цвета</li>
                    <li> Нажмите кнопку "Добавить"</li>
                </ol>
            </div>
        </div>
    )

}

export default AddCategory