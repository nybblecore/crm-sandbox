import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { cordova, components, containers, utils } from 'sq-core/web';

import containers_all from './containers';
import i18n from './i18n';
import HealthApp from './containers/App';
import './error-messages';

import theme from './theme';
import {store} from './redux';

import config from './config';
import analytics from './utils/analytics';
import allHistory from './history';
import './utils/custom-formatters';
import './icons';
import './styles/main.scss';

const { isApp } = cordova;
const { addComp } = components;
const { DynamicContent } = containers;
const {
  translate: { loadLanguages },
  redirect: { setUrlMapping, setHistory }
} = utils;

const history = isApp() ? allHistory.hash() : allHistory.browser();

loadLanguages(i18n);

DynamicContent.registerContainers({
  ...containers_all
});

setHistory(history);
setUrlMapping(config.urlMapping);

var app = {
  initialize: function () {
    this.bindEvents();
  },
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  initApp: function () {
  },
  onDeviceReady: function (direct) {
    if (!direct) {
      this.initApp();
    }
    ReactDOM.render(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <HealthApp onAnalytics={analytics.doAnalytics} />
          </Router>
        </MuiThemeProvider>
      </Provider>,
      document.getElementById('root')
    );
  }
};
if (isApp()) {
  app.initialize();
} else {
  app.onDeviceReady(true);
}
const setFullHeight = () => {
  document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px');
};
window.addEventListener('resize', () => {
  setFullHeight();
});

setFullHeight();
