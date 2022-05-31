
import React from 'react';
import s from './Login.module.css';
import { Checkbox, Form, Input, Button, Space } from 'antd';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { addActionUser, login } from './../../Redux/profileReducer';


const Login = (props) => {


  const navigate = useNavigate()

  const onFinish = (values) => {

    props.updateLogin(true)
    props.login(values.username, values.password)
    
    props.addActionUser(props.profile.users.find(a=> a.name === values.username))
    navigate('/')
    
  }

  const validator =(_,value)=> {
    if (!props.profile.users.find(a=> a.name === value)) {
return Promise.reject(new Error('Такого имени нет в природе)'))
    }
    return Promise.resolve()  } 


// Ошибки после сабмита
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }

  const ret =()=> {
    props.updateLogin(false)
  }

  return (
    <div  >

      <div  className={s.shadow}>
        <Form
        size='large'
          name="login"
          labelCol={{ span: 8}}
          wrapperCol={{span: 12}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
          
            style={{ marginBottom: 10,  }}
            label="Логин"
            name="username"
            rules={[
              {
                required: true,
                message: 'Введите логин!',
              },
              {
                validator:validator
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
export default connect(mapStateToProps, {addActionUser, login}) (Login);