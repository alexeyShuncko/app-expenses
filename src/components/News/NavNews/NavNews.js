import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './NavNews.module.css';


const NavNews = (props) => {


 
  return (
    <div>
    <nav className={s.navNews}>
      <div className={s.navNewsitem}>
        <NavLink to="/main" className={(navData) => navData.isActive ? s.active : "" } >Главная</NavLink>
      </div>
      <div className={s.navNewsitem}>
        <NavLink to="/statistic" className={(navData) => navData.isActive ? s.active : "" }>Статистика</NavLink>
      </div>
      <div className={s.navNewsitem}>
        <NavLink to="/graphs" className={(navData) => navData.isActive ? s.active : "" }>График</NavLink>
      </div>
      <div className={s.navNewsitem}>
        <NavLink to="/diagramm" className={(navData) => navData.isActive ? s.active : "" }>Диаграмма</NavLink>
      </div>
      <div className={s.navNewsitem}>
        <NavLink to="/setting" className={(navData) => navData.isActive ? s.active : "" }>Настройки</NavLink>
      </div>
      <div className={s.navNewsitem}>
        <NavLink to="/about" className={(navData) => navData.isActive ? s.active : "" }>О приложении</NavLink>
      </div>

    </nav>
   
    </div>
  )
}
export default NavNews;