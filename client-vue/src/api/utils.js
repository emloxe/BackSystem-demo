import axios from 'axios';
import store from '@/store';

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code } = response.data;
    // 要根据success的成功与否决定下面的操作
    if (code === 0) {
      return response.data;
    } else {
      // 业务错误
      return Promise.reject(response.data);
    }
  },
  (error) => {
    // 处理 token 超时问题
    if (error.response && error.response.data && error.response.data.code === 401) {
      // token超时
      store.dispatch('user/logout');
    }
    return Promise.reject(error);
  }
);
