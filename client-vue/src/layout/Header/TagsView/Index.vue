<template>
  <div class="tags-view-container" :style="{ backgroundColor: $store.getters.cssVar.containerBg }">
    <div class="tags-view-wrapper">
      <scroll-pane ref="scrollPane" @scroll="handleScroll">
        <router-link
          class="tags-view-item"
          :class="isActive(tag) ? 'active' : ''"
          :style="{
            color: isActive(tag) ? sidebarBg : '',
          }"
          v-for="(tag, index) in $store.getters.tagsViewList"
          :key="tag.fullPath"
          :to="{ path: tag.fullPath }"
          @contextmenu.prevent="openMenu($event, index)"
        >
          <div class="tab-background" data-v-3a3c05b2=""></div>
          <div class="tab-title">{{ tag.title }}</div>
          <el-icon v-show="$store.getters.tagsViewList.length > 1">
            <close @click.prevent.stop="onCloseClick(index)"
          /></el-icon>
        </router-link>
        <span style="display: inline-block; width: 30px"></span>
      </scroll-pane>
    </div>

    <context-menu v-show="visible" :style="menuStyle" :index="selectIndex"></context-menu>

    <div class="refresh-btn">
      <el-icon><refresh /></el-icon>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { Refresh, Close } from '@element-plus/icons-vue';
import { ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import ScrollPane from './ScrollPane';
import ContextMenu from './ContextMenu.vue';

const route = useRoute();

const store = useStore();

const sidebarBg = store.getters.cssVar.sidebarBg;

/**
 * 是否被选中
 */
const isActive = (tag) => {
  return tag.path === route.path;
};

/**
 * 关闭 tag 的点击事件
 */

const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: index,
  });
};

// contextMenu 相关
const selectIndex = ref(0);
const visible = ref(false);
const menuStyle = reactive({
  left: 0,
  top: 0,
});
/**
 * 展示 menu
 */
const openMenu = (e, index) => {
  const { x, y } = e;
  menuStyle.left = x + 'px';
  menuStyle.top = y + 'px';
  selectIndex.value = index;
  visible.value = true;
};

/**
 * 关闭 menu
 */
const closeMenu = () => {
  visible.value = false;
};

const handleScroll = () => {
  closeMenu();
};

/**
 * 监听变化
 */
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
  }
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  position: relative;
  width: 100%;
  height: 44px;
  box-sizing: border-box;
  padding-top: 8px;
  // overflow-x: auto;
  // overflow-y: hidden;

  .tags-view-wrapper {
    // display: inline-block;
    // padding-top: 8px;
    height: 36px;
    padding-right: 40px;
    white-space: nowrap;
    overflow: hidden;

    // &::-webkit-scrollbar {
    //   display: none;
    // }

    .tags-view-item {
      box-sizing: border-box;
      display: inline-block;
      position: relative;
      cursor: pointer;
      width: 150px;
      height: 36px;
      margin-left: -2px;
      line-height: 36px;
      // border: 1px solid #d8dce5;
      color: #999;
      // background: #fff;
      padding: 0 16px;
      text-align: left;
      font-size: 15px;
      border-radius: 8px 8px 0 0;
      &:first-of-type {
        margin-left: 15px;

        &::before {
          background-color: transparent !important;
        }
      }

      &:first-of-type &:last-of-type {
        margin-right: 15px;
      }

      &::before {
        content: '';
        position: absolute;
        top: 10px;
        left: -1px;
        width: 1px;
        height: 16px;
        background-color: #cecece;
      }
      &.active {
        z-index: 1;
        background-color: #fff;
        color: #fff;
        &::before {
          background-color: transparent !important;
        }
      }

      ::v-deep .el-icon {
        font-size: 12px;
        float: right;
        margin-top: 12px;
        &:hover {
          background-color: #b4bccc;
          color: #fff;
          border-radius: 6px;
        }
      }

      // close 按钮
      .el-icon-close {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }

    .tab-title {
      float: left;
      width: 100px;
      mask-image: linear-gradient(90deg, #000 0%, #000 calc(100% - 24px), transparent);
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .refresh-btn {
    position: absolute;
    top: 10px;
    right: 5px;
    width: 30px;
    height: 30px;
    line-height: 36px;
    text-align: center;

    cursor: pointer;

    border-radius: 4px;
    background-color: #fff;
    transition: box-shadow 0.5s;
    box-shadow: 0 0 5px rgba(200, 200, 200, 0.1);
    &:hover {
      box-shadow: 0 0 5px rgba(200, 200, 200, 0.3);
    }
  }
}
</style>
