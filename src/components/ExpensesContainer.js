import React, { useEffect } from 'react';
import s from './ExpensesContainer.module.css';
import Header from './Header/Header';
import { Route, Routes } from 'react-router';
import Main from './Main/Main';
import Statistic from './Statistic/Statistic';
import Grafs from './Graphs/Graphs';
import DiagrammContainer from './Diagramm/DIagrammContainer';
import Setting from './Setting/Setting';
import AboutApp from './AboutApp/AboutApp';
import Profile from './Profile/Profile';

import { DateFunc } from './helpers/DateFunc/DateFunc';
import {
  addTodayS,
  addTodayPo,
  addText,
  addActivHedgehog,
  categories,
  sources,
  salary,
  relativ,
} from './../Redux/diagrammReducer';
import { updateLogin } from './../Redux/profileReducer';
import { connect } from 'react-redux';
import Hedgehog from './Hedgehog/Hedgehog';

// Возможная ленивая загрузка

// const Statistic = lazy(() => import('./Statistic/Statistic'))
// const Grafs = lazy(() => import('./Graphs/Graphs'))
// const DiagrammContainer = lazy(() => import('./Diagramm/DIagrammContainer'))

const ExpensesContainer = ({
  addActivHedgehog,
  addText,
  categories,
  sources,
  salary,
  relativ,
  ...props
}) => {
  useEffect(() => {
    addText(
      `Здравствуйте, "${
        localStorage.getItem('remember')
          ? JSON.parse(localStorage.getItem('user')).username
          : props.profile.actionUser.username
      }"... Чтобы моё собщение исчезло, кликните вне сообщения...`
    );
    addActivHedgehog(true);

    categories();
    sources();
    salary();
    relativ();
  }, [
    categories,
    sources,
    salary,
    relativ,
    addText,
    addActivHedgehog,
    props.profile.actionUser,
  ]);

  const dateToday = new Date();
  if (props.diagramm.today.po !== DateFunc(dateToday)) {
    props.addTodayPo(DateFunc(dateToday));
    props.addTodayS(
      DateFunc(new Date(dateToday.setDate(dateToday.getDate() - 31)))
    );
  }

  return (
    <div className={s.newsContainerItems}>
      <div className={s.newsContainerNav}>
        <Header updateLogin={props.updateLogin} />
        {/* <div className={s.hedgehog}>
          <Hedgehog
            category={props.diagramm.category}
            addActivHedgehog={addActivHedgehog}
            text={props.diagramm.text}
            activHedgehog={props.diagramm.activHedgehog}
          />
        </div> */}
      </div>

      <div className={s.content}>
        <div>
          {/* <Suspense fallback={null}> */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/statistic" element={<Statistic />} />
            <Route path="/graphs" element={<Grafs />} />
            <Route path="/diagramm" element={<DiagrammContainer />} />
            <Route path="/setting/*" element={<Setting />} />
            <Route path="/about" element={<AboutApp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          {/* </Suspense> */}
        </div>
      </div>
    </div>
  );
};
let mapStateToProps = (state) => {
  return {
    diagramm: state.expenses,
    profile: state.profile,
  };
};
export default connect(mapStateToProps, {
  addTodayS,
  addTodayPo,
  addText,
  addActivHedgehog,
  categories,
  sources,
  salary,
  relativ,
  updateLogin,
})(ExpensesContainer);
