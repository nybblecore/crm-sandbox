import { observable, action } from 'mobx';
import userStore from './userStore';
import commonStore from './commonStore';
import {utils} from 'sq-core/web';

const {apiBridge} = utils;

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable user;
  @observable users;

  @action async checkUser() {
    apiBridge.post('/api/v1/user/info', {}).then((resp) => {
      this.user = resp.data.user;
    });
  }
  @action async getUsers() {
    apiBridge.post('/api/v1/user/all', {}).then((resp) => {
      this.users = resp.data.users.map((i) => i.fullName);
    });
  }

  @action async login(user) {
    commonStore.startLoading();
    const response = await userStore.login(user);
    if (response.status === 'success') {
      await userStore.pullUser();
    }
    commonStore.stopLoading();
    return response;
  }

  @action logout() {
    userStore.forgetUser();
    return Promise.resolve();
  }
}

export default new AuthStore();
