import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const history = createBrowserHistory()

axios.defaults.baseURL = 'http://localhost:3000/api/v1'

ReactDOM.render(
  <Router history={history}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
