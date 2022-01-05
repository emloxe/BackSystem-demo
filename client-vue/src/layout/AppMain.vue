<template>
  <div class="app-main" :style="{ backgroundColor: $store.getters.cssVar.containerBg }">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <div class="app-main-center">
            <component :is="Component" :key="route.path" />
          </div>
        </keep-alive>
      </transition>
      <p class="copyright">Copyright © 2021 ZWJ, All Rights Reserved</p>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { isTags } from '@/utils/tags';
import { generateTitle, watchSwitchLang } from '@/utils/i18n';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();

/**
 * 生成 title
 */
const getTitle = (route) => {
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

/**
 * 监听路由变化
 */
const store = useStore();
watch(
  route,
  // eslint-disable-next-line no-unused-vars
  (to, from) => {
    if (!isTags(to.path)) return;
    const { fullPath, meta, name, params, path, query } = to;
    if (!['404'].includes(name)) {
      store.commit('app/addTagsViewList', {
        fullPath,
        meta,
        name,
        params,
        path,
        query,
        title: getTitle(to),
      });
    }
  },
  {
    immediate: true,
  }
);

/**
 * 国际化 tags
 */
watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route),
      },
    });
  });
});
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.app-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 150px 0px 20px 0px;
  box-sizing: border-box;
}

.app-main-center {
  flex-grow: 1;
}

.copyright {
  flex-grow: 0;

  margin-top: 10px;

  color: #808695;
  text-align: center;
  font-size: 14px;
}

::v-deep .box-card {
  margin: $spacing;
}

::v-deep .left-page {
  margin-top: 20px;
  text-align: right;
}

::v-deep .full-wrap {
  display: flex;
  margin: $spacing;
  .left {
    margin-right: $spacing;
  }
  .right {
    flex: 1;
  }
}

::v-depp .form-center {
  width: 600px;
  margin: auto;
}
</style>
