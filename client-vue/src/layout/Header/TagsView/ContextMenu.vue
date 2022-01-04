<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      <i class="icon-wrap"
        ><el-icon><refresh /></el-icon
      ></i>
      {{ $t('msg.tagsView.refresh') }}
    </li>
    <div class="divider"></div>

    <li @click="onClose">
      <i class="icon-wrap">
        <el-icon><close /></el-icon>
      </i>
      {{ $t('msg.tagsView.closeCurr') }}
    </li>

    <li @click="onCloseRightClick">
      <i class="icon-wrap"></i> {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li @click="onCloseOtherClick">
      <i class="icon-wrap"></i> {{ $t('msg.tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// eslint-disable-next-line no-unused-vars
import { Refresh, Close } from '@element-plus/icons-vue';
const store = useStore();

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const onRefreshClick = () => {
  // const view = store.getters.tagsViewList[props.index];

  router.go(0);
  // this.$store.dispatch('tagsView/delCachedView', props.index).then(() => {
  //   const { fullPath } = view;
  //   this.$nextTick(() => {
  //     this.$router.replace({
  //       path: '/redirect' + fullPath,
  //     });
  //   });
  // });
};

const onClose = () => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: props.index,
  });
};

const onCloseRightClick = () => {
  store.commit('app/removeTagsView', {
    type: 'right',
    index: props.index,
  });
};

const onCloseOtherClick = () => {
  store.commit('app/removeTagsView', {
    type: 'other',
    index: props.index,
  });
};
</script>

<style lang="scss" scoped>
$liHeight: 36px;

.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 10px 0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);

  li {
    margin: 0;
    min-width: 100px;
    padding: 0 30px 0 25px;
    cursor: pointer;
    line-height: $liHeight;
    &:hover {
      background: #eee;
    }

    .icon-wrap {
      display: inline-block;
      width: 20px;
      height: $liHeight;
      // background-color: #333;
      font-size: 14px;
      vertical-align: top;
    }

    ::v-deep .el-icon {
      vertical-align: middle;
    }
  }

  .divider {
    height: 1px;
    background: #f0f0f0;
    margin: 5px 0;
  }
}
</style>
