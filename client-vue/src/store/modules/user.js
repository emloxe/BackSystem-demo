/* eslint-disable no-unused-vars */
import { TOKEN } from '@/config/constant';
import { setItem, getItem, removeAllItem } from '@/utils/storage';

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {},
};
