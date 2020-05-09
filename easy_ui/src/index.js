import React from 'react';
import ReactDOM from 'react-dom';
import CreateRoutes from './components/Routes';
import './index.css';
  
  ReactDOM.render(
    <CreateRoutes />,
    document.getElementById('root')
  );

  if(module.hot) {
    module.hot.accept()
  }