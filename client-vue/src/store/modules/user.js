/* eslint-disable no-unused-vars */
import { TOKEN, USERINFO } from '@/config/index';
import { setItem, getItem, removeAllItem } from '@/utils/storage';

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: getItem(USERINFO) || {},
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
      setItem(TOKEN, token);
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      setItem(USERINFO, userInfo);
    },
  },
  actions: {
    // logout() {
    //   resetRouter();
    //   this.commit('user/setToken', '');
    //   this.commit('user/setUserInfo', {});
    //   removeAllItem();
    //   router.push('/login');
    // },
  },
};
