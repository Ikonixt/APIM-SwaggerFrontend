import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import alertReducer from './reducers/alertReducer';
import showAPIReducer from './reducers/showAPIReducer';
import filterReducer from './reducers/filterReducer';

const reducers = combineReducers({
  alert: alertReducer,
  showAPI: showAPIReducer,
  filter: filterReducer
});

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();