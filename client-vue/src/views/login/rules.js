// eslint-disable-next-line no-unused-vars
import i18n from '@/i18n/index';
export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')));
    } else {
      callback();
    }
  };
};