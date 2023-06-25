import React from 'react';
import ReactDOM from 'react-dom';
import store from './Redux/redux-store';
import locale from 'antd/lib/locale/ru_RU';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

ReactDOM.render(
  <ConfigProvider locale={locale} theme={{ algorithm: defaultAlgorithm }}>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </ConfigProvider>,
  document.getElementById('root')
);
