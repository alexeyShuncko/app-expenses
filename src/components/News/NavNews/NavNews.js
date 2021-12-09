import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './NavNews.module.css';


const NavNews = (props) => {
  
  return (
    <nav className={s.navNews}>
      <div className={s.navNewsitem}>
        <NavLink to="/main" activeClassName={s.activeLink}>Главная</NavLink>
      </div>
      <div className={s.navNewsitem}>
        <NavLink to="/statistic" activeClassName={s.activeLink}>Статистика</NavLink>
      </div>
      <div className={s.navNewsitem}>
        <NavLink to="/setting" activeClassName={s.activeLink}>Настройка</NavLink>
      </div>

    </nav>
  )
}
export default NavNews;