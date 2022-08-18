
import React from 'react';
import s from './Login.module.css';
import { Checkbox, Form, Input, Button, Space } from 'antd';
import { connect } from 'react-redux';
import { addActionUser, getUser, login } from './../../Redux/profileReducer';



const Login = ({ getUser, ...props }) => {


  const [form] = Form.useForm()


  const onFinish = (values) => {


    if (props.profile.users && !props.profile.users.map(a => a.username).includes(values.username)) {
      form.setFields([{ errors: [`Пользователь с таким именем не зарегистрирован!`], name: 'username' }])
    }
    else if (values.username === 'test' && values.password !== props.profile.test.password) {
      form.setFields([{ errors: [`Неверный пароль!`], name: 'password' }])
    }
    else {

      if (values.remember) {
        localStorage.setItem('remember', true)
        localStorage.setItem('user', JSON.stringify(props.profile.users.find(a => a.username === values.username)))
      }
      props.profile.users && props.addActionUser(props.profile.users.find(a => a.username === values.username))
      props.login(values.username, values.password)
        .catch(() => form.setFields([{ errors: [`Неверный пароль!`], name: 'password' }]))

    }
  }

  const ret = () => {
    props.updateLogin(false)
  }

  return (
    <div className={s.container}>

      <div className={s.test}>Для просмотра тестового аккаунта: <br></br>
        <span className={s.passLog}>Логин:</span> testUser<br></br>
        <span className={s.passLog}>Пароль:</span> test1234Q
      </div>

      <div className={s.shadow}>

       { props.profile.firstLogin 
       && <div className={s.firstLogin}>
         Вы успешно зарегистрировались!<br></br>
        Введите данные для входа в поля ниже.
        </div>}

        <Form
          form={form}
          size='large'
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
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
              }
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
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                Войти
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
export default connect(mapStateToProps, { addActionUser, getUser, login })(Login);