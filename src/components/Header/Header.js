import { Select, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import hedgehog from '../../image/hedgehog.png';

const Header = (props) => {
  const navName = [
    { name: 'Главная', path: '/' },
    { name: 'Статистика', path: '/statistic' },
    { name: 'График', path: '/graphs' },
    { name: 'Диаграмма', path: '/diagramm' },
    { name: 'Настройки', path: '/setting' },
    { name: 'О приложении', path: '/about' },
  ];

  const optSelect = [
    {
      value: 'BYN',
      label: 'BYN',
    },
    {
      value: 'USD',
      label: 'USD',
    },
    {
      value: 'EUR',
      label: 'EUR',
    },
    {
      value: 'RUB',
      label: 'RUB',
    },
  ];

  const items = [
    {
      label: (
        <NavLink
          to={'/profile'}
          className={(navData) => (navData.isActive ? s.active : '')}>
          Личный кабинет
        </NavLink>
      ),
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">Выйти</a>,
      key: '1',
    },
  ];

  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img src={hedgehog} alt="Ёжик" width={20} />
        <span>Лого</span>
      </div>
      <Select
        defaultValue="BYN"
        options={optSelect}
        className={s.selectValuta}
      />
      <nav className={s.menu}>
        {navName.map((a) => (
          <div key={a.name} className={s.menuItem}>
            <NavLink
              to={a.path}
              className={(navData) => (navData.isActive ? s.active : '')}>
              {a.name}
            </NavLink>
          </div>
        ))}
      </nav>
      <div className={s.nameUser}>
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}>
          <span>Имя пользователя</span>
        </Dropdown>
      </div>
    </header>
  );
};
export default Header;
