import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {render} from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
