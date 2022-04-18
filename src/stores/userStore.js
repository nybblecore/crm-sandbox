import { action, observable } from 'mobx';
import CommonStore from './commonStore';

export class UserStore {
  @observable currentUser;
  constructor(options = {}) {
    const { commonStore = CommonStore } = options;
    this.commonStore = commonStore;
  }

  hasToken() {
    return document.cookie.indexOf('sqLogged') > -1;
  }

  @action isLoggedIn() {
    return !!this.currentUser;
  }
}

export default new UserStore();
