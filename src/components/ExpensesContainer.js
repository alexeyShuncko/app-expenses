import s from './ExpensesContainer.module.css';
import { Route, Routes } from 'react-router';
import Header from './Header/Header';
import Main from './Main/Main';
import Statistic from './Statistic/Statistic';
import Grafs from './Graphs/Graphs';
import DiagrammContainer from './Diagramm/DIagrammContainer';
import Setting from './Setting/Setting';
import AboutApp from './AboutApp/AboutApp';
import Profile from './Profile/Profile';

import { DateFunc } from './helpers/DateFunc/DateFunc';
import { addTodayS, addTodayPo } from './../Redux/diagrammReducer';
import { updateLogin } from './../Redux/profileReducer';
import { connect } from 'react-redux';

// Возможная ленивая загрузка

// const Statistic = lazy(() => import('./Statistic/Statistic'))
// const Grafs = lazy(() => import('./Graphs/Graphs'))
// const DiagrammContainer = lazy(() => import('./Diagramm/DIagrammContainer'))

const ExpensesContainer = (props) => {
  // const dateToday = new Date();
  // if (props.today.po !== DateFunc(dateToday)) {
  //   props.addTodayPo(DateFunc(dateToday));
  //   props.addTodayS(
  //     DateFunc(new Date(dateToday.setDate(dateToday.getDate() - 31)))
  //   );
  // }
  console.log();
  return (
    <>
      <Header updateLogin={props.updateLogin} profile={props.profile} />
      <div className={s.content}>
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
    </>
  );
};
let mapStateToProps = (state) => {
  return {
    today: state.expenses.today,
    profile: state.profile,
  };
};
export default connect(mapStateToProps, {
  addTodayS,
  addTodayPo,
  updateLogin,
})(ExpensesContainer);
