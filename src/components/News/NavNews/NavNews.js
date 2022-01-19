import React from 'react';
import { Link } from 'react-router-dom';

import s from './NavNews.module.css';


const NavNews = (props) => {
  
  return (
    <nav className={s.navNews}>
      <div className={s.navNewsitem}>
        <Link to="/main" activeClassName={s.activeLink}>Главная</Link>
      </div>
      <div className={s.navNewsitem}>
        <Link to="/statistic" activeClassName={s.activeLink}>Статистика</Link>
      </div>
      <div className={s.navNewsitem}>
        <Link to="/setting" activeClassName={s.activeLink}>Настройка</Link>
      </div>

    </nav>
  )
}
export default NavNews;