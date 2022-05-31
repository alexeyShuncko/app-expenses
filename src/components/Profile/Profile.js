import React from "react";
import s from './Profile.module.css';
import { connect } from 'react-redux';
import { Button } from "antd";
import { updateLogin } from './../../Redux/profileReducer';


const Profile = (props) => {

    

    const updateProfile = (e) => {
     
        console.log(e.currentTarget.name)
    }

    const Logout = () => {
        props.updateLogin(false)
    }
    const user = [
        'Имя',
        'Email',
        'Пароль'
    ]
    const www = props.actionUser && Object.values(props.actionUser)


   

    return (
        <div className={s.profile}>
          
            <div>
                <div style={{ fontSize: '30px', marginBottom: '20px' }}>
                    Информация о пользователе:
                </div>
                <ul>
                    {user.map((a, index) =>
                        <li className={s.list} key={a.length}>
                            <div>
                                {a}: {www && www[index]}
                            </div>
                            <Button
                                type='primary'
                                name={a}
                                size="small"
                                onClick={updateProfile}>
                                Изменить
                            </Button>
                        </li>)
                    }
                </ul>

            </div>
            <Button type="primary" danger onClick={Logout}>
                Выйти из учетной записи
            </Button>
        </div>

    )
}

let mapStateToProps = (state) => {
    return {
        actionUser: state.profile.actionUser
    }
}
export default connect(mapStateToProps, { updateLogin })(Profile)