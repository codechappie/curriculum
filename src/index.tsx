import React from 'react';
import ReactDOM from 'react-dom';
import CurriculumApp from './CurriculumApp';
import reportWebVitals from './reportWebVitals';

import './assets/css/general.css';
import './assets/css/styles.css';

ReactDOM.render(
  <React.StrictMode>
    <CurriculumApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
