import React from 'react';
import s from './SettingNav.module.css';
import { Link } from 'react-router-dom';

const SettingNav = (props) => {
    return (
        <div className={s.buttons}>

            <div className={s.navNewsitem}>
                <Link to="/setting/AddCategory" >
                    <button className={s.settingButton}>Добавить категорию</button>
                </Link>
            </div>
            <div className={s.navNewsitem}>
                <Link to="/setting/DeleteCategory" >
                    <button className={s.settingButton}>Удалить категорию</button>
                </Link>
            </div>
            <div className={s.navNewsitem}>
                <Link to="/setting/RenameCategory" >
                    <button className={s.settingButton}>Переименовать категорию</button>
                </Link>
            </div>
            <div className={s.navNewsitem}>
                <Link to="/setting/Color" >
                    <button className={s.settingButton}>Изменить цвет категории</button>
                </Link>
            </div>
            

        </div>
    )

}

export default SettingNav