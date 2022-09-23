import React from 'react';
import s from './SettingNav.module.css';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';

const SettingNav = (props) => {




    let settingArr = [
        { name: 'Добавить категорию расходов', path: '/setting/AddCategory' },
        { name: 'Удалить категорию расходов', path: '/setting/DeleteCategory' },
        { name: 'Переименовать категорию расходов', path: '/setting/RenameCategory' },
        { name: 'Изменить цвет категории расходов', path: '/setting/Color' },
        { name: 'Добавить относительную величину', path: '/setting/Relativity' },
        { name: 'Добавить/изменить дату доходов', path: '/setting/AddSalaryDate' },
    ]

    return (
        <div className={s.buttons} id="blockSetting">
            {
                settingArr.map((a, i) =>
                    <div className={s.navNewsitem} style={{'--i':i+1}} key={a.name}>
                        <NavLink to={a.path} >
                            <Button type='primary' size='large'>{a.name}</Button>
                        </NavLink>
                    </div>
                )
            }
        </div>
    )
}

export default SettingNav