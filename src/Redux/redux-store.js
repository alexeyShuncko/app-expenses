import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import diagrammReduser from './diagrammReducer';
import profileReducer from './profileReducer';

let reducers = combineReducers({
  expenses: diagrammReduser,
  profile: profileReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
window.store = store;
