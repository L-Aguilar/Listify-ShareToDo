import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import tareaReducer from './tareasDucks'
import listaReducer from './listaDucks'

const rootReducer = combineReducers({
    tareas:tareaReducer,
    lista: listaReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)) )
    return store;
}