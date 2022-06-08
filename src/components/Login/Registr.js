
import React from 'react';
import s from './Login.module.css';
import { Form, Input, Button, Space } from 'antd';
import { registration } from './../../Redux/profileReducer';
import { connect } from 'react-redux';


const Registr = (props) => {

  const [form] = Form.useForm()

  
  const onFinish = (values) => {
    props.registration(values.username, values.password, values.email)
    .catch(() =>  form.setFields([{ errors: [`Слишком распространённый пароль!`], name: 'password' }]))
  }


  
  const ret = () => {
    props.updateLogin(false)
  }


  function checkPassword(value) {
    let password = value; // Получаем пароль из формы
    let s_letters = "qwertyuiopasdfghjklzxcvbnm"; // Буквы в нижнем регистре
    let b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM"; // Буквы в верхнем регистре
    let digits = "0123456789"; // Цифры
    let specials = "!@#$%^&*()_-+=\|/.,:;[]{}"; // Спецсимволы
    let is_s = false; // Есть ли в пароле буквы в нижнем регистре
    let is_b = false; // Есть ли в пароле буквы в верхнем регистре
    let is_d = false; // Есть ли в пароле цифры
    let is_sp = false; // Есть ли в пароле спецсимволы
    for (let i = 0; i < password.length; i++) {
      /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
      if (!is_s && s_letters.indexOf(password[i]) !== -1) is_s = true;
      else if (!is_b && b_letters.indexOf(password[i]) !== -1) is_b = true;
      else if (!is_d && digits.indexOf(password[i]) !== -1) is_d = true;
      else if (!is_sp && specials.indexOf(password[i]) !== -1) is_sp = true;
    }
    let rating = 0;
    let text = "";
    if (is_s) rating++; // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
    if (is_b) rating++; // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
    if (is_d) rating++; // Если в пароле есть цифры, то увеличиваем рейтинг сложности
    if (is_sp) rating++; // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности
    /* Далее идёт анализ длины пароля и полученного рейтинга, и на основании этого готовится текстовое описание сложности пароля */
    if (password.length < 6 && rating < 3) text = "Простой";
    else if (password.length < 6 && rating >= 3) text = "Средний";
    else if (password.length >= 8 && rating < 3) text = "Средний";
    else if (password.length >= 8 && rating >= 3) text = "Сложный";
    else if (password.length >= 6 && rating === 1) text = "Простой";
    else if (password.length >= 6 && rating > 1 && rating < 4) text = "Средний";
    else if (password.length >= 6 && rating === 4) text = "Сложный";
    return text; // Форму не отправляем
  }


  const validator = (_, value) => {

const reg = /[^0-9]/

    if (value.length < 8) {
      return Promise.reject(new Error('Пароль слишком короткий, минимум 8 символов!'))
    }
    else if (!reg.test(value)) {
      return Promise.reject(new Error('Пароль не должен состоять только из цифр!'))
    }

      else if ( checkPassword(value) === 'Простой') {
        return Promise.reject(new Error('Недостаточно сложный пароль!'))
      } 
      else if ( checkPassword(value) === 'Средний') {
        return Promise.reject(new Error('Недостаточно сложный пароль!'))
      }
   else return Promise.resolve()
  }
 

  return (
    <div className={s.container}>

      <div className={s.shadow}>
        <Form
        form={form}
          size='large'
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          //initialValues={{remember: true}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            hasFeedback
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
            hasFeedback
            style={{ marginBottom: 10 }}
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Введите пароль!',
              },
              {
                validator: validator
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
          hasFeedback
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
          hasFeedback
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
export default connect(mapStateToProps, { registration })(Registr);