import 'core-js'; //兼容ie11
import React from 'react';
import ReactDOM from 'react-dom';
import RouteConfig from './router/';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import '@src/assets/scss/reset.css';
import store from './store';
// 全局中文配置
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import ajax from '@src/assets/js/ajax/';
import Cookies from 'js-cookie';
import validate from '@src/assets/js/validation';
React.$Cookies = Cookies;
React.$validate = validate;
React.$ajax = ajax;
moment.locale('zh-cn');
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zh_CN}>
      <RouteConfig />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
);
// serviceWorker.unregister();
