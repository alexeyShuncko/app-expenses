import React from 'react';
import s from './SettingNav.module.css';
import { NavLink, } from 'react-router-dom';

const SettingNav = (props) => {
    return (
        <div className={s.buttons}>

            <div className={s.navNewsitem}>
                <NavLink to="/setting/AddCategory" activeClassName={s.activeLink}>
                    <button className={s.settingButton}>Добавить категорию</button>
                </NavLink>
            </div>
            <div className={s.navNewsitem}>
                <NavLink to="/setting/DeleteCategory" activeClassName={s.activeLink}>
                    <button className={s.settingButton}>Удалить категорию</button>
                </NavLink>
            </div>
            <div className={s.navNewsitem}>
                <NavLink to="/setting/RenameCategory" activeClassName={s.activeLink}>
                    <button className={s.settingButton}>Переименовать категорию</button>
                </NavLink>
            </div>

        </div>
    )

}

export default SettingNav