/* eslint-disable no-unused-vars */
import router from '@/router';

import { LANG, TAGS_VIEW } from '@/config/index';
import { setItem, getItem } from '@/utils/storage';

export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || [],
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
    /**
     * 设置国际化
     */
    setLanguage(state, lang) {
      setItem(LANG, lang);
      state.language = lang;
    },
    /**
     * 添加 tags
     */
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path;
      });
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag);
        setItem(TAGS_VIEW, state.tagsViewList);
      }
    },
    /**
     * 为指定的 tag 修改 title
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag;
      setItem(TAGS_VIEW, state.tagsViewList);
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        const del = state.tagsViewList.splice(payload.index, 1);
        // 如果要关闭的是活动页
        if (del[0].fullPath === location.pathname) {
          if (state.tagsViewList[payload.index]) {
            router.push(state.tagsViewList[payload.index]);
          } else {
            router.push(state.tagsViewList[payload.index - 1]);
          }
        }
        return;
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1);
        state.tagsViewList.splice(0, payload.index);

        // todo 如果活动页被关闭
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1);
        // todo 如果活动页被关闭
      }
      setItem(TAGS_VIEW, state.tagsViewList);
    },
  },
  actions: {},
};
