import React from 'react';
import ReactDOM from 'react-dom';
import store from './Redux/redux-store';
import 'antd/dist/antd.min.css'

import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';

import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';



ReactDOM.render(

  <ConfigProvider  locale={locale}>
    <HashRouter>
     
      <Provider store={store}>
        <App />
      </Provider>
      
    </HashRouter>

  </ConfigProvider>
  ,

  document.getElementById('root')
);
