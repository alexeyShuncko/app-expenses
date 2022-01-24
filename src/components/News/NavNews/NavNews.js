import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './NavNews.module.css';


const NavNews = (props) => {
  
 
  return (
    <nav className={s.navNews}>
      <div className={s.navNewsitem}>
        <NavLink to="/main" className={(navData) => navData.isActive ? s.active : "" } >Главная</NavLink>
      </div>
      <div className={s.navNewsitem}>
        <NavLink to="/statistic" className={(navData) => navData.isActive ? s.active : "" }>Статистика</NavLink>
      </div>
      <div className={s.navNewsitem}>
        <NavLink to="/setting" className={(navData) => navData.isActive ? s.active : "" }>Настройка</NavLink>
      </div>

    </nav>
  )
}
export default NavNews;