import React from 'react';
import s from './Relativity.module.css';
import { Form, Select, Space, Button, Input } from 'antd';



const Relativity = (props) => {

    const [form] = Form.useForm()

    const returnSetting = () => {
        window.history.back()
    }

    let selectArr = [
        'штука',
        'пачка',
        'литр',
        'килограмм',
        'пара',
        'бутылка'
    ]

    const funcValidText = (e) => {    // валидация ввода, только русские буквы ... подумать над пробелом !!!!
        const regex1 = /[^А-ЯЁа-яё]/  //  и несколькими словами....
        const regexEng = /[A-Za-z]/
        if (regexEng.test(e.target.value)) {
            props.addText('Переключите на русский язык ...')
            props.addActivHedgehog(true)
        }
        e.target.value = e.target.value.replace(regex1, '')
    }
    // максимальная длинна 7 символов и 2 после запятой
    const funcValidNumber = (e) => {
        if (e.target.value.includes(".")) {
            e.target.value = e.target.value.substring(0, e.target.value.indexOf(".") + 3);
        }
        if (e.target.value.length > 7) {
            e.target.value = e.target.value.substr(0, 7)
        }
    }


    const onFinish = (values) => {

        props.nameCaseRelativity(values.name, values.select, values.price)
        props.addText(`Относительная величина "${values.name}" добавлена ...`)
        props.addActivHedgehog(true)

        form.resetFields()
    }


    return (
        <div className={s.mainRelativity}>
            <div className={s.title}>Добавление относительной величины</div>

            <div className={s.relativity}>
                <Form className={s.form}
                    form={form}
                    name="relativity"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 10 }}
                    onFinish={onFinish}
                    initialValues={{ select: 'штука' }}
                    autoComplete="off"
                >

                    <Form.Item
                        style={{ marginBottom: 10 }}
                        label="Название величины"
                        name="name"
                        hasFeedback
                        rules={[{ required: true, message: 'Введите название величины!' }]}>
                        <Input onInput={funcValidText} maxLength='14' />
                    </Form.Item>

                    <Form.Item
                        style={{ marginBottom: 10 }}
                        label="Единицы измерения"
                        name='select'>
                        <Select >
                            {
                                selectArr.map(a =>
                                    <Select.Option key={a} value={a}>{a}</Select.Option >)
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label="Стоимость в бел.руб."
                        name='price'
                        rules={[{ required: true, message: 'Введите стоимость величины!' }]}>

                        <Input
                            type={'number'}
                            onInput={funcValidNumber}
                            step='0.01'
                        />

                    </Form.Item>

                    <Form.Item
                        style={{ marginTop: 30 }}
                        wrapperCol={{ offset: 10 }}>
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
                        Чтобы добавить относительную величину, следуйте ниже приведенным шагам:</div>
                    <div>
                        <div>1) В поле "Название величины" впишите название вашей величины</div>
                        <div>2) Из выпадающего списка "Единицы измерения" выберите в чем измеряется ваша величина</div>
                        <div>3) В поле "Стоимость" впишите стоимость за одну единицу вашей величины в бел. рублях</div>
                        <div>4) Нажмите кнопку "Добавить"
                            <div>(увидеть пересчёт ваших расходов в относительную величину
                                вы можете на странице "Статистика", выбрав категорию)</div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Relativity