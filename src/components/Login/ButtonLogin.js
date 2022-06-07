
import React from 'react';
import s from './Login.module.css';
import { Form, Button, Space } from 'antd';


const ButtonLogin = (props) => {

  const redirect = (e) => {
    
    e.currentTarget.innerText === 'Войти'
      ? props.updateLogin('login')
      : props.updateLogin('registr')
  }

  return (
    <div  className={s.container}>

    <div className={s.shadow}>
      <Form
        size='large'
        name="buttonLogin"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        autoComplete="off"
      >
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Space>
            <Button type="primary" onClick={redirect}>
              Войти
            </Button>
            <Button type="primary" danger onClick={redirect}>
              Регистрация
            </Button>
          </Space>
        </Form.Item>

      </Form>
    </div>
    </div>
  )
}
export default ButtonLogin;