import { Button, Form, Select, Space } from 'antd';
import React, { useState } from 'react';
import s from './DeleteCategory.module.css';





const DeleteCategory = (props) => {


    let [color, setColor] = useState(props.diagramm.category[0].color)

    const [form] = Form.useForm()

    const diagramm = props.diagramm.category

    const returnSetting = () => {
        window.history.back()
    }

    const onColorAdd = (value) => {
        setColor((props.diagramm.category.find(a => a.name === value).color))
    }
    const onFinish = (values) => {

        if (props.diagramm.category.length === 1) {

            props.addText(`Последнюю категорию нельзя удалять ...`)
            props.addActivHedgehog(true)
        }

        else {
            props.deleteItemCategories(props.diagramm.category.find(a => a.name === values.select).id)

            props.addText(`Категория "${values.select}" удалена ...`)
            props.addActivHedgehog(true)

            form.resetFields()
            setColor(props.diagramm.category[0].color)
            if (props.diagramm.activ.name === values.select) {
                props.addActiv(props.diagramm.category[0])
            }
        }

    }

    return (

        <div>
            <div className={s.title}>Удаление категории</div>

            <div className={s.delet}>

                <Form className={s.form}
                    form={form}
                    name="deleteCategory"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 10 }}
                    onFinish={onFinish}
                    initialValues={{ select: diagramm[0].name }}
                    //onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Название категории"
                        labelCol={{ offset: 1 }}
                        name='select'>
                        <Select
                            onChange={onColorAdd}
                            className={s.selectCateg}
                            style={{ backgroundColor: `rgba(${color.slice(4, -1)},0.6)` }}
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
                        style={{ marginTop: 30 }}
                        wrapperCol={{ offset: 10 }}>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit">
                                Удалить
                            </Button>
                            <Button type="primary" danger onClick={returnSetting}>
                                Назад
                            </Button>
                        </Space>
                    </Form.Item>

                </Form>


                <div className={s.instruction}>
                    <div>
                        <div>1) В поле "Название категории" выберите из выпадающего списка необходимую категорию</div>
                        <div>2) Нажмите кнопку "Удалить"</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DeleteCategory