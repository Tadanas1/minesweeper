import createSagaMiddleware from 'redux-saga'
import reducer, {DEFAULT_STATE} from './reducers'
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {rootSaga} from "./channels";
const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
    const store = createStore(reducer, DEFAULT_STATE, compose(applyMiddleware(sagaMiddleware, thunk)));
    sagaMiddleware.run(rootSaga);
    return store;
}

const store = configureStore();
export default store;