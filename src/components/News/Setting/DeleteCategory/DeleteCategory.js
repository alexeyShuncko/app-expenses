import { Button, Form, Select, Space } from 'antd';
import React from 'react';
import s from './DeleteCategory.module.css';





const DeleteCategory = (props) => {

    const [form] = Form.useForm()

    const diagramm = props.diagramm.category

    const returnSetting = () => {
        window.history.back()
    }


    const onFinish = (values) => {
        props.deleteCategory(values.select)

        props.addText(`Категория "${values.select}" удалена ...`)
        props.addActivHedgehog(true)
        props.addActiv('')
        form.resetFields()
    }

    return (

        <div>
            <div className={s.title}>Удаление категории</div>

            <div className={s.delet}>

                <Form className={s.form}
                    form={form}
                    name="deleteCategory"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 9 }}
                    onFinish={onFinish}
                    initialValues={{ select: diagramm[0].nameRus }}
                    //onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                     label="Название категории"
                     labelCol={{ offset: 1 }}
                        name='select'>
                        <Select
                            style={{ width: 120 }}
                        >
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
                        style={{ marginTop: 30 }}
                        wrapperCol={{ offset: 8 }}>
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
                    <div className={s.instructionTitle}>
                        Чтобы удалить категорию, следуйте ниже приведенным шагам:</div>
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