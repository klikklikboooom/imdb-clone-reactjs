import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import createRoutes from './components/Routes';
import './index.css';
  
  ReactDOM.render(
    createRoutes(),
    document.getElementById('root')
  );

  if(module.hot) {
    module.hot.accept()
  }