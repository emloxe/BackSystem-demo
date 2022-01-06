import { generateTitle } from './i18n';

const whiteList = ['/login', '/import', '/404', '/401'];

/**
 * path 是否需要被缓存
 * @param {*} path
 * @returns
 */
export function isTags(path) {
  return !whiteList.includes(path);
}

/**
 * 生成 title
 */
export const getTitle = (route) => {
  let title = '';
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/');
    title = pathArr[pathArr.length - 1];
  } else {
    title = generateTitle(route.meta.title);
  }
  return title;
};
