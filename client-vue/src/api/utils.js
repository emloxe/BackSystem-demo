import axios from 'axios';
import store from '@/store';
import { ElMessage } from 'element-plus';

export const service = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data;
    // 要根据success的成功与否决定下面的操作
    if (code === 0) {
      return response.data;
    } else {
      // 业务错误
      ElMessage.error(msg); // 提示错误消息
      return Promise.reject(response.data);
    }
  },
  (error) => {
    // 处理 token 超时问题
    if (error.response && error.response.data && error.response.data.msg) {
      ElMessage.error(error.response.data.msg);

      if (error.response.data.code === 401) {
        // 需要重新登录
        store.dispatch('user/logout');
      }
    } else {
      ElMessage.error('接口出错' + error.response.status);
    }
    return Promise.reject(error);
  }
);
