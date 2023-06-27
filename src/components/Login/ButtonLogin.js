import React, { useLayoutEffect, useState } from 'react';
import s from './Login.module.css';
import { Form, Button, Space } from 'antd';
import { connect } from 'react-redux';
import { DateFunc } from '../helpers/DateFunc/DateFunc';
import {
  getUser,
  verification,
  addActionUser,
} from './../../Redux/profileReducer';
import {
  categories,
  sources,
  salary,
  relativ,
  addTodayS,
  addTodayPo,
} from './../../Redux/diagrammReducer';
import setting from './../../image/Settings.gif';

const ButtonLogin = ({
  getUser,
  verification,
  categories,
  sources,
  salary,
  relativ,
  ...props
}) => {
  const [err, setErr] = useState(false);

  const dateToday = new Date();
  if (props.today.po !== DateFunc(dateToday)) {
    props.addTodayPo(DateFunc(dateToday));
    props.addTodayS(
      DateFunc(new Date(dateToday.setDate(dateToday.getDate() - 31)))
    );
  }

  let data = props.profile.users;

  useLayoutEffect(() => {
    if (data.length < 2) {
      getUser().catch(() => setErr(true));
    }
  }, [getUser, data]);

  const redirect = (e) => {
    e.currentTarget.innerText === 'Войти'
      ? localStorage.getItem('remember') && localStorage.getItem('key')
        ? verification()
            .then(() =>
              Promise.all([categories(), sources(), salary(), relativ()])
            )
            .then(() => {
              props.addActionUser(JSON.parse(localStorage.getItem('user')));
              props.updateLogin(true);
            })
        : props.updateLogin('login')
      : props.updateLogin('registr');
  };

  return (
    <div className={s.container}>
      {!err ? (
        <div className={s.shadow}>
          <Form
            size="large"
            name="buttonLogin"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            autoComplete="off">
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
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
      ) : (
        <div className={s.err}>
          Ведутся работы на сервере, попробуйте зайти позже...
          <img alt="крутилка" src={setting} />
        </div>
      )}
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    profile: state.profile,
    today: state.expenses.today,
  };
};
export default connect(mapStateToProps, {
  getUser,
  verification,
  addActionUser,
  categories,
  sources,
  salary,
  relativ,
  addTodayS,
  addTodayPo,
})(ButtonLogin);
