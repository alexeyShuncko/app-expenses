import { applyMiddleware, combineReducers, createStore } from "redux"
import  thunkMiddleware from "redux-thunk"
import diagrammReduser from "./diagrammReducer";


let reducers = combineReducers(
    {
      
        expenses: diagrammReduser 
    }
)

let store =createStore(reducers, applyMiddleware(thunkMiddleware));

export default store
window.store = store