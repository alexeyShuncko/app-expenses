import { applyMiddleware, combineReducers, createStore } from "redux"
import  thunkMiddleware from "redux-thunk"
import diagrammReduser from "./diagrammReducer";
import profileReducer from "./profileReducer";


let reducers = combineReducers(
    {
        expenses: diagrammReduser,
        profile: profileReducer 
    }
)

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store
window.store = store