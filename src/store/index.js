import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose; //调试插件
const enhancer = composeEnhancers(applyMiddleware(thunk)) //thunk
const reducerModule = combineReducers({
    reducer
})
const store = createStore(
    reducerModule,
    enhancer
)
export default store;