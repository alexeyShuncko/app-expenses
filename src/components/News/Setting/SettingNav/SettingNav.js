import React from 'react';
import s from './SettingNav.module.css';
import { NavLink } from 'react-router-dom';

const SettingNav = (props) => {
    return (
        <div className={s.buttons}>

            <div className={s.navNewsitem}>
                <NavLink to="/setting/AddCategory" >
                    <button className={s.settingButton}>Добавить категорию</button>
                </NavLink>
            </div>
            <div className={s.navNewsitem}>
                <NavLink to="/setting/DeleteCategory" >
                    <button className={s.settingButton}>Удалить категорию</button>
                </NavLink>
            </div>
            <div className={s.navNewsitem}>
                <NavLink to="/setting/RenameCategory" >
                    <button className={s.settingButton}>Переименовать категорию</button>
                </NavLink>
            </div>
            <div className={s.navNewsitem}>
                <NavLink to="/setting/Color" >
                    <button className={s.settingButton}>Изменить цвет категории</button>
                </NavLink>
            </div>
            <div className={s.navNewsitem}>
                <NavLink to="/setting/Relativity" >
                    <button className={s.settingButton}>Относительная величина</button>
                </NavLink>
            </div>
            <div className={s.navNewsitem}>
                <NavLink to="/setting/AddSalaryDate" >
                    <button className={s.settingButton}>Добавить дату ЗП</button>
                </NavLink>
            </div>
            

        </div>
    )

}

export default SettingNav