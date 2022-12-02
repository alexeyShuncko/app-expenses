import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './NavNews.module.css';

const NavNews = (props) => {
  const navName = [
    { name: 'Главная', path: '/' },
    { name: 'Статистика', path: '/statistic' },
    { name: 'График', path: '/graphs' },
    { name: 'Диаграмма', path: '/diagramm' },
    { name: 'Настройки', path: '/setting' },
    { name: 'О приложении', path: '/about' },
    { name: 'Учётная запись', path: '/profile' },
  ];

  return (
    <nav className={s.navNews}>
      {navName.map((a) => (
        <div className={s.navNewsitem} key={a.name}>
          <NavLink
            to={a.path}
            className={(navData) => (navData.isActive ? s.active : '')}>
            {a.name}
          </NavLink>
        </div>
      ))}
    </nav>
  );
};
export default NavNews;
