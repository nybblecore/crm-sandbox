import { stores } from 'sq-core/web';
import userStore from './userStore';
import commonStore from './commonStore';
import authStore from './authStore';
import 'whatwg-fetch';
const { contentStore } = stores;
const _stores = {
  userStore,
  commonStore,
  authStore,
  contentStore
};

export default _stores;
