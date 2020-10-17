import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import {compose, createStore, applyMiddleware} from "redux";
import {rootReducer} from "./redux/reducers/rootReducers";
import { BrowserRouter } from "react-router-dom";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const devtools = process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : x => x

const store = createStore(rootReducer, persistedState, compose(
  applyMiddleware(thunk),
  devtools
))

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    user: store.getState().user
  });
});

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);
