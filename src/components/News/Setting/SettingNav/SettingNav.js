import React from 'react';
import s from './SettingNav.module.css';
import { NavLink } from 'react-router-dom';

const SettingNav = (props) => {

    let settingArr = [
        { name: 'Добавить категорию', path: '/setting/AddCategory' },
        { name: 'Удалить категорию', path: '/setting/DeleteCategory"' },
        { name: 'Переименовать категорию', path: '/setting/RenameCategory' },
        { name: 'Изменить цвет категории', path: '/setting/Color' },
        { name: 'Добавить относительную величину', path: '/setting/Relativity' },
        { name: 'Добавить/изменить дату доходов', path: '/setting/AddSalaryDate' },
    ]

    return (
        <div className={s.buttons}>
            {
                settingArr.map(a =>
                    <div className={s.navNewsitem} key={a.name}>
                        <NavLink to={a.path} >
                            <button className={s.settingButton}>{a.name}</button>
                        </NavLink>
                    </div>
                )
            }
        </div>
    )
}

export default SettingNav