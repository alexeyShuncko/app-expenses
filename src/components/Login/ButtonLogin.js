
import React, { useEffect, useState } from 'react';
import s from './Login.module.css';
import { Form, Button, Space } from 'antd';
import { connect } from 'react-redux';
import { getUser } from './../../Redux/profileReducer';
import  setting  from './../../image/Settings.gif';



const ButtonLogin = ({ getUser, ...props }) => {


  const [err, setErr] = useState(false)

  useEffect(() => {
    getUser()
      .catch(() => setErr(true))
  }, [getUser])

  const redirect = (e) => {

    e.currentTarget.innerText === 'Войти'
      ? props.updateLogin('login')
      : props.updateLogin('registr')
  }

  return (
    <div className={s.container}>

      {
        !err
          ? <div className={s.shadow}>
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
          : <div className={s.err}>
            Ведутся работы на сервере, попробуйте зайти позже...
            <img alt='крутилка' src={setting}/>
          </div>
      }
    </div>
  )
}


let mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}
export default connect(mapStateToProps, { getUser })(ButtonLogin);
