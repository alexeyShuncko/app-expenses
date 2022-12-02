import React from 'react';
import ExpensesContainer from './components/ExpensesContainer';
import ButtonLogin from './components/Login/ButtonLogin';
import Login from './components/Login/Login';
import Registr from './components/Login/Registr';
import { connect } from 'react-redux';
import { updateLogin } from './Redux/profileReducer';

const App = (props) => {
  if (!props.login) {
    return <ButtonLogin updateLogin={props.updateLogin} />;
  } else if (props.login === 'login') {
    return <Login updateLogin={props.updateLogin} />;
  } else if (props.login === 'registr') {
    return <Registr updateLogin={props.updateLogin} />;
  } else if (props.login) {
    return <ExpensesContainer updateLogin={props.updateLogin} />;
  }
};

let mapStateToProps = (state) => {
  return {
    login: state.profile.login,
  };
};

export default connect(mapStateToProps, { updateLogin })(App);
