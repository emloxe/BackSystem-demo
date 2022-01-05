import { getItem, setItem } from '@/utils/storage';
import { MAIN_COLOR, DEFAULT_COLOR } from '@/config/index';
import variables from '@/styles/variables.scss';
export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables,
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state, newColor) {
      state.mainColor = newColor;
      state.variables.sidebarBg = newColor;
      setItem(MAIN_COLOR, newColor);
    },
  },
};
