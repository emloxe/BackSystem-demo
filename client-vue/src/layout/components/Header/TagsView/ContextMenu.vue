<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick"><i class="icon-wrap"></i> {{ $t('msg.tagsView.refresh') }}</li>
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
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const onRefreshClick = () => {
  router.go(0);
};

const store = useStore();
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
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 14px 0;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);

  li {
    margin: 0;
    min-width: 100px;
    padding: 0 20px 0 10px;
    cursor: pointer;
    line-height: 30px;
    &:hover {
      background: #eee;
    }

    .icon-wrap {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-color: #333;
      vertical-align: top;
    }
  }
}
</style>
