import { observable, action } from 'mobx';
import { utils } from 'sq-core/web';
import Config from '../config';
import apiConfig from '../api-config';
const {
  apiBridge,
  translate: { translate },
  appEvents: { events },
  queryString: { query },
  redirect: { redirectTo },
  browser
} = utils;

const appConfig = window.APP_CONFIG;

class CommonStore {
  @observable appName = 'SQFinance';
  @observable showNotification = false;
  @observable notification = {};
  @observable appLoaded = false;
  @observable isLoading = false;
  @observable isError = false;
  @observable showPopup = false;
  @observable errorMessage = '';
  @observable screenName = '';
  @observable screenTitle = '';
  @observable showScreen = false;
  @observable countries;

  constructor({ config = Config } = {}) {
    this.config = config;
    apiBridge.events.subscribe('onUnRecognizedError', this.onUnRecognizedError.bind(this));
    apiBridge.events.subscribe('onErrorPopup', this.onErrorPopup.bind(this));
    apiBridge.events.subscribe('onUnauthroized', this.onUnauthroized.bind(this));
    apiBridge.events.subscribe('onCustomError', this.onCustomError.bind(this));
    events.subscribe('beforeRedirect', this.onBeforeRedirect.bind(this));
  }

  onBeforeRedirect() {}

  onUnauthroized() {
    redirectTo('login');
  }

  @action closeNotify() {
    this.showNotification = false;
  }

  @action closePopup() {
    this.showPopup = false;
  }

  async pullCountries() {
    //getCountries
    if (!this.countries) {
      const response = await apiBridge.post(apiConfig.getCountries, {});
      this.countries = response.data.countries;
    }
  }

  isProtectedUrl(pathname) {
    const params = query.get();
    return this.config.urls.protected.indexOf(pathname) > -1 && !params.licenceKey;
  }

  isPlayScreen(pathname) {
    return this.config.urls.playScreens.indexOf(pathname) === -1;
  }

  isBackAllowed(pathname) {
    return this.config.urls.gameapp.indexOf(pathname) > -1;
  }

  @action setToken(token) {
    this.token = token;
  }

  @action startLoading() {
    this.isLoading = true;
  }
  @action breakpointDown(breakpoint) {
    return browser.breakpoints.down(breakpoint);
  }

  @action setError(message) {
    this.stopLoading();
    this.isError = true;
    this.errorMessage = message;
  }

  @action clearError() {
    this.stopLoading();
    this.isError = false;
    this.errorMessage = '';
  }

  showNotificationMessage(message, timeout = 3000, type, callback) {
    this.notification.show = true;
    this.notification.prevTimeout && clearInterval(this.notification.prevTimeout);
    this.notification.prevTimeout = null;
    this.notification.message = message;
    this.notification.type = type;
    this.notification.prevTimeout = setTimeout(() => {
      this.notification.show = false;
      this.notification.message = '';
      callback && callback();
    }, timeout);
  }

  openScreen(screenName, screenTitle = '', events = {}, screenProps) {
    this.screenName = screenName;
    this.screenTitle = screenTitle;
    this.showScreen = true;
    this.screenEvents = events;
    this.screenProps = screenProps;
  }

  closeScreen() {
    this.screenName = '';
    this.showScreen = false;
    this.screenEvents && this.screenEvents.close && this.screenEvents.close();
    this.screenProps = undefined;
    this.screenEvents = undefined;
  }

  @action async contact(form) {
    const response = await apiBridge.post(apiConfig.contactMessage, form);
    return response;
  }

  @action notify(message, type = 'success') {
    this.showNotification = true;
    this.notificationMessage = message;
    this.notificationType = type;
  }

  @action showPopupMessage(message, title, type) {
    this.showPopup = true;
    this.popupMessage = message;
    this.popupTitle = title || (type === 'error' ? translate('Error') : '');
    this.popupType = type;
  }

  getAppVersion() {
    return appConfig && appConfig.appVersion;
  }

  onUnRecognizedError(response) {
    this.notify(response.error.message, 'error');
    this.stopLoading();
  }

  onCustomError(response) {
    const { handleType } = response.error;
    switch (handleType) {
      case 'SUBSCRIPTION_REQUIRED':
        this.openScreen('/gopremium', translate('Premium'));
        break;
      default:
        return false;
    }
  }

  onErrorPopup(response) {
    this.notify(response.error.message, 'error');
    this.stopLoading();
  }

  @action stopLoading() {
    this.isLoading = false;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
