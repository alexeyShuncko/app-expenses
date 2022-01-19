import React from 'react';
import s from './SettingNav.module.css';
import { Link } from 'react-router-dom';

const SettingNav = (props) => {
    return (
        <div className={s.buttons}>

            <div className={s.navNewsitem}>
                <Link to="/setting/AddCategory" activeClassName={s.activeLink}>
                    <button className={s.settingButton}>Добавить категорию</button>
                </Link>
            </div>
            <div className={s.navNewsitem}>
                <Link to="/setting/DeleteCategory" activeClassName={s.activeLink}>
                    <button className={s.settingButton}>Удалить категорию</button>
                </Link>
            </div>
            <div className={s.navNewsitem}>
                <Link to="/setting/RenameCategory" activeClassName={s.activeLink}>
                    <button className={s.settingButton}>Переименовать категорию</button>
                </Link>
            </div>
            <div className={s.navNewsitem}>
                <Link to="/setting/Сolor" activeClassName={s.activeLink}>
                    <button className={s.settingButton}>Изменить цвет категории</button>
                </Link>
            </div>

        </div>
    )

}

export default SettingNav