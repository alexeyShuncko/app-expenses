import React from 'react';
import s from './RenameCategory.module.css';
import { Button, Form, Input, Select, Space } from 'antd';


const RenameCategory = (props) => {

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


    const validator = (rule, value) => {
        if (value && props.diagramm.category.find(a => a.nameRus.toLowerCase() === value.toLowerCase())) {
            return Promise.reject(new Error(`Категория "${value}" уже есть!`))
        }
        return Promise.resolve()
    }



    const onFinish = (values) => {
        props.renameCategory(values.select, values.name)

        props.addText(`"${values.select}" переименована в  "${values.name}" ...`)
        props.addActivHedgehog(true)

        props.nameCase(values.name) //добавление имени в винительном падеже ...
        form.resetFields()
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
                    initialValues={{ select: diagramm[0].nameRus }}
                    //onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                    style={{marginBottom: 10}}
                        label="Название категории"
                        name='select'>
                        <Select>
                            {diagramm.map(a =>
                                <Select.Option value={a.nameRus}
                                    key={a.nameRus}
                                //style={{ backgroundColor: ` ${a.color}` }}
                                >
                                    {a.nameRus}
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
                        wrapperCol={{ offset: 9 }}>
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
                            (Название не должно совпадать с уже имеющимися категориями и должно быть длинною до 14 символов)
                        </div>
                        <div>3) Нажмите кнопку "Переименовать"</div>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default RenameCategory