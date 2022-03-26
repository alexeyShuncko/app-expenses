import React from 'react';
import ReactDOM from 'react-dom';
import store from './Redux/redux-store';
import 'antd/dist/antd.css'

import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';

//import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';


ReactDOM.render(

  <ConfigProvider  locale={locale}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>

  </ConfigProvider>
  ,



  document.getElementById('root')
);
