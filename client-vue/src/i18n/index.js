import { createI18n } from 'vue-i18n';
import mZhLocale from './lang/zh';
import mEnLocale from './lang/en';
import store from '@/store';

const messages = {
  en: {
    msg: {
      ...mEnLocale,
    },
  },
  zh: {
    msg: {
      ...mZhLocale,
    },
  },
};

/**
 * 返回当前 lang
 */
function getLanguage() {
  console.log(store, store.getters);
  return store && store.getters && store.getters.language;
}
console.log(getLanguage());
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages,
});

export default i18n;
