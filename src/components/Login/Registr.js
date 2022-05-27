
import React from 'react';
import s from './Login.module.css';
import { Form, Input, Button, Space } from 'antd';
import { addUser, registration } from './../../Redux/profileReducer';
import { connect } from 'react-redux';


const Registr = (props) => {


  const onFinish = (values) => {

    props.updateLogin('login')

    props.addUser(values.username, values.password, values.email)
    props.registration(values.username, values.password, values.email)
  }



  const ret = () => {
    props.updateLogin(false)
  }

  return (
    <div>

      <div className={s.shadow}>
        <Form
          size='large'
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          //initialValues={{remember: true}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item

            style={{ marginBottom: 10, }}
            label="Логин"
            name="username"
            rules={[
              {
                required: true,
                message: 'Введите логин!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 10 }}
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Введите пароль!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 10 }}
            label="Повторите пароль"
            name="passwordTu"
            rules={[
              {
                required: true,
                message: 'Введите пароль!',
              },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),

            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Введите Email!',
              },
              {
                type: 'email',
                message: 'Некоректный Email!',
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                Зарегистрироваться
              </Button>
              <Button type="primary" danger onClick={ret}>
                Назад
              </Button>
            </Space>
          </Form.Item>

        </Form>
      </div>

    </div>
  )
}

let mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}
export default connect(mapStateToProps, { addUser, registration })(Registr);